import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login({ user, setUser}){
    const navigate = useNavigate();
    const [validPwd,setValidPwd] = useState(true);
    const [validUsername,setValidUsername] = useState(true);

    const login = ()=>{
        let useId = document.getElementById("id").value;
        let pwd = document.getElementById("password").value;

        axios.get("http://localhost:4000/accounts/"+useId)
            .then(function (result) {
            console.log(result.data.password+" "+pwd)
            result.data.password===pwd?setValidPwd(true):setValidPwd(false);
            if(result.data.password===pwd){
                setUser(result.data);
                navigate('MyList');
            }
          })
          .catch(function (error) {
            console.log(error);
            setValidUsername(false);
          });
    }

    if(user){
        return(
            <>
                <h1>Welcome, {user.name}</h1>
                <button onClick={() => {setUser(null)}}>log out</button>
            </>
        );
    }
    return(
        <>
            <h1>Login</h1>
                <div>
                    <label htmlFor="id">Username</label>
                    <input type="text" id="id" /> {validUsername?'':<span className="w3-red">Invalid username</span>}
                    <br /><br />
                    <label htmlFor="id">Password</label>
                    <input type="password" id="password" />{validPwd?'':<span className="w3-red">Invalid username</span>}
                    <br /><br />
                    <button onClick={login} style={{marginRight:"2vw"}}>Log in</button> <button onClick={() => navigate('Register')}>Register</button>
                </div>
            </>
        );
}