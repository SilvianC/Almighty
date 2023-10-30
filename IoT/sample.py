import random  
import time  
import json  
import pandas as pd  
import numpy as np  
import pvlib  
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient  

# AWS IoT Core   
ENDPOINT = "a1e7krie0yxq08-ats.iot.ap-northeast-2.amazonaws.com"
CLIENT_ID = 'B001'  
TOPIC = 'bms/battery_data/B001/metric'  
PORT = 8883  

#Create an MQTT client  
mqttc = AWSIoTMQTTClient(CLIENT_ID)  
mqttc.configureEndpoint(ENDPOINT,PORT)  
#Create credentials by locating your certificates and private key  
mqttc.configureCredentials("./certs/AmazonRootCA1.pem","./certs/private.pem.key","./certs/certificate.pem.crt")  

#Connect to the MQTT broker  
try:  
    mqttc.connect()  
    print("AWS IoT Core Connected")  
except Exception as e:  
    print(f"Failed to connect to AWS IoT Core: {e}")  
    exit()  # Terminate the script if connection fails  

# Define battery parameters  
battery_id = "B001"  
capacity = 3600  # Wh  
nominal_voltage = 48  # V  
battery_soc = 0.5  # Initial State of Charge (SoC)  
battery_soh = 1.0  # Initial State of Health (SoH)  
aging_rate = 0.005  # 0.5% capacity reduction per day  

# Define solar charging parameters  
solar_voltage_range = (11, 150)  # V  
max_solar_current = 15  # A  
max_solar_power = 1600  # W  

# Define AC power consumption profiles for equipment  
tv_power = 100  # W (during the day)  
lights_power = 50  # W (during the evening)  
refrigerator_power = 150  # W (intermittently throughout the day)  

# Define safety thresholds  
low_battery_warning_threshold = 0.2  # 20% SoC  
overcharge_threshold = 0.95  # 95% SoC  
overcurrent_threshold = 30  # A  
overvoltage_threshold = 52  # V  

# Define user profiles with randomized time of use  
user_profiles = {}  

# Modify the battery model to reflect the variation in voltage with SoC  
def get_battery_voltage(soc):  
    return nominal_voltage * (0.5 + 0.5 * soc)  # Assume that the voltage varies linearly from 50% to 100% of the nominal voltage  

# Modify the user profile generation code to generate random user profiles  
def generate_user_profiles():  
    equipment_list = ["TV", "Lights", "Refrigerator"]  
    for i in range(10):  # Assume there are 10 users  
        equipment = random.sample(equipment_list, random.randint(1, len(equipment_list)))  # Each user has 1 to 3 types of equipment  
        time_of_use = [(random.randint(0, 24), random.randint(0, 24)) for _ in range(random.randint(1, 3))]  # Each user uses the equipment at 1 to 3 different times of the day  
        user_profiles[f"user{i+1}"] = {"equipment": equipment, "time_of_use": time_of_use}  

generate_user_profiles()  # Generate user profiles  

# Define temperature and humidity profiles with randomized daily fluctuations  
temp_min, temp_max = 15, 35  # Temperature range in Celsius  
humidity_min, humidity_max = 0.2, 0.8  # Humidity range  

def get_temperature_and_humidity(hour):  
    # Return temperature and humidity based on time of day  
    # Random fluctuations: ±2 degrees for temperature  
    temperature_fluctuation = np.random.uniform(-2, 2)  
    if 6 <= hour < 12:  
        temperature = 20 + temperature_fluctuation  # Morning: 20 degrees  
    elif 12 <= hour < 18:  
        temperature = 25 + temperature_fluctuation  # Afternoon: 25 degrees  
    elif 18 <= hour < 24:  
        temperature = 22 + temperature_fluctuation  # Evening: 22 degrees  
    else:  
        temperature = 18 + temperature_fluctuation  # Night: 18 degrees  

    # Calculate humidity based on temperature  
    humidity = 0.6 + 0.01 * (temperature - 20) + np.random.uniform(-0.02, 0.02)  

    # Ensure humidity stays within the valid range  
    humidity = max(min(humidity, humidity_max), humidity_min)  

    # Round temperature and humidity to two decimal places  
    temperature = round(temperature, 2)  
    humidity = round(humidity * 100)  

    return temperature, humidity  

def simulate_solar_power():  
    # Get current time and solar position  
    current_time = pd.Timestamp(time.time(), unit='s', tz='Asia/Seoul')  
    latitude = 37.5665  # Latitude for Seoul  
    longitude = 126.9780  # Longitude for Seoul  
    solar_position = pvlib.solarposition.get_solarposition(current_time, latitude, longitude)  

    # Calculate solar power generation using the pvlib library  
    solar_power = pvlib.irradiance.get_total_irradiance(  
        surface_tilt=30,  # Assume a tilt angle of 30 degrees for the solar panels  
        surface_azimuth=180,  # Assume the panels are facing south  
        solar_zenith=solar_position['apparent_zenith'].values[0],  # Use the calculated solar zenith angle  
        solar_azimuth=solar_position['azimuth'].values[0],  # Use the calculated solar azimuth angle  
        dni=1000,  # Assume direct normal irradiance of 1000 W/m^2  
        ghi=800,   # Assume global horizontal irradiance of 800 W/m^2  
        dhi=200    # Assume diffuse horizontal irradiance of 200 W/m^2  
    )['poa_global']  # Get the plane-of-array global irradiance  

    # Make sure solar power is within the valid range  
    solar_power = max(0, min(solar_power, max_solar_power))  
    return solar_power  

def get_user_profiles(hour):  
    # Determine the active user profiles based on the time of day  
    return {user_id: profile for user_id, profile in user_profiles.items() if any(start <= hour < end for start, end in profile["time_of_use"])}  

def simulate_ac_power_consumption(profile, time_interval):  
    # Simulate AC power consumption based on user equipment usage patterns  
    equipment_power = sum(globals()[equipment.lower() + "_power"] for equipment in profile["equipment"])  
    return equipment_power * time_interval  # Power consumption in watts  

def simulate_battery_behavior(solar_power, load_power, time_interval, temperature, humidity):  
    global battery_soc, battery_soh, capacity  

    # Calculate net power: positive for charging, negative for discharging  
    net_power = solar_power - load_power  # Power in watts  

    # Update battery state of charge (SoC)  
    delta_soc = net_power * time_interval / (capacity * get_battery_voltage(battery_soc))  # SoC change  
    battery_soc = min(max(battery_soc + delta_soc, 0), 1)  # Keep SoC between 0 and 1  

    # Calculate battery aging based on the aging rate  
    battery_soh -= aging_rate * time_interval / (24 * 60)  # Aging rate per day  

    # Ensure the battery state of health (SoH) stays within the valid range  
    battery_soh = max(battery_soh, 0)  

    # Update the battery capacity based on the SoH  
    capacity = 3600 * battery_soh  # Update capacity based on SoH  

    # If battery life is over, replace with a new one  
    if battery_soh <= 0:  
        battery_soh = 1.0  

def check_safety_measures():  
    # Check safety measures and return error codes  
    return {  
        "low_battery_warning": bool(battery_soc < low_battery_warning_threshold),  
        "overcharge_protection": bool(battery_soc > overcharge_threshold),  
        # Simplified current based on power = voltage * current  
        "overcurrent_protection": bool((simulate_solar_power() - sum(simulate_ac_power_consumption(profile, 1) for profile in get_user_profiles(time.localtime().tm_hour).values())) / get_battery_voltage(battery_soc) > overcurrent_threshold),  
        "overvoltage_protection": bool(get_battery_voltage(battery_soc) > overvoltage_threshold),  
    }  

# Main simulation loop  
start_time = time.time()  # Get the current time  
for i in range(24 * 60):  # Simulate for 24 hours in 1-minute time steps  
    current_time = time.localtime(start_time + i * 60)  # Get the current time  

    # Get current temperature and humidity  
    temperature, humidity = get_temperature_and_humidity(current_time.tm_hour)  

    # Simulate solar charging if it's daytime  
    solar_power = simulate_solar_power()  

    # Get current user profiles and simulate AC power consumption regardless of daytime or nighttime  
    active_user_profiles = get_user_profiles(current_time.tm_hour)  
    load_power = sum(simulate_ac_power_consumption(profile, 1) for profile in active_user_profiles.values())  # 1-minute time interval  

    # Simulate battery behavior  
    simulate_battery_behavior(solar_power, load_power, 1, temperature, humidity)  # 1-minute time interval  

    # Check safety measures  
    safety_measures = check_safety_measures()  

    # Prepare data payload  
    payload = {  
    "battery_id": battery_id,  # Add battery ID to payload  
    "location": {  
        "lat": 35.173008,  # Directly include latitude  
        "lon": 129.127909,  # Directly include longitude  
    },  
    "battery_data": {  
        "battery_voltage": get_battery_voltage(battery_soc),  
        "battery_current": solar_power / get_battery_voltage(battery_soc) if solar_power > 0 else load_power / get_battery_voltage(battery_soc),  
        "battery_soc": battery_soc,  
        "battery_soh": battery_soh,  
        "battery_temperature": temperature,  # Update battery temperature  
        "battery_humidity": humidity,  # Update battery humidity  
    },  
    "solar_charging_data": {  
        "solar_voltage": solar_power / max_solar_current if solar_power > 0 else 0,  
        "solar_current": max_solar_current if solar_power > 0 else 0,  
        "solar_power": solar_power,  
    },  
    "ac_power_consumption_data": {  
        "ac_power_consumption": load_power,  
    },  
    "error_codes": safety_measures  
}  
    # Display the data payload as a JSON string every 1 minute  
    if i % 12 == 0:  # Print every 12 iterations, which corresponds to every 1 minute  
        try:  
            mqttc.publish(TOPIC, json.dumps(payload), 0)  
            print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()), " : Message published. Data:" + json.dumps(payload) + "\n")  
        except: print(f"Failed to publish message: {e}")  

    # Wait for the next time step  
    time.sleep(5)  # Wait for 5 seconds  

# Disconnect from AWS IoT Core  
mqttc.disconnect()