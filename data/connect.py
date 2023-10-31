from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import time


# AWS IoT Core  
ENDPOINT = "a1e7krie0yxq08-ats.iot.ap-northeast-2.amazonaws.com"
CLIENT_ID = 'B001'
TOPIC = 'bms/battery_data/B001/metric'
PORT = 8883
CERT_PATH = "./certs/certificate.pem.crt"
KEY_PATH = "./certs/private.pem.key"
ROOT_CA_PATH = "./certs/AmazonRootCA1.pem"

#Create an MQTT client  
mqttClient = AWSIoTMQTTClient(CLIENT_ID)
mqttClient.configureEndpoint(ENDPOINT, PORT)
mqttClient.configureCredentials(ROOT_CA_PATH, KEY_PATH, CERT_PATH)

#Connect to the MQTT broker  
try:  
    mqttClient.connect()  
    message = {"key1": "value1", "key2": "value2"}
    mqttClient.publish(TOPIC, str(message), 0)
    print("AWS IoT Core Connected")  
except Exception as e:  
    print(f"Failed to connect to AWS IoT Core: {e}")  
    exit()  # Terminate the script if connection fails  

# Disconnect 
mqttClient.disconnect()
