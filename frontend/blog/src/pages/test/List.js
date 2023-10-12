import React from "react";

const User = ({userData}) => {
    return (
        <tr>
            <td>{userData.name}</td>
            <td>{userData.email}</td>
        </tr>
    )
}

const  UserList = () => {
    
    const users = [
        {email: "sdl@kfj",name:"유재석"},
        {email: "sdl@kfj",name:"유재석"},
        {email: "sdl@kfj",name:"유재석"},
        {email: "sdl@kfj",name:"유재석"},
    ]; 

    return (
        <table>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>이메일</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <User userData = {user}/>)}
            </tbody>
        </table>
    ) 
}

export default UserList;

