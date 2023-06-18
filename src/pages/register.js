import axios from "axios";
import React, { useState } from "react";


export default function Register(){
  
  const [userAdded,setUserAdded] = useState(false);
  const [isRegisterBtnShowing,setIsRegisterBtnShowing] = useState(true);

  //eslint-disable-next-line
  const [account,setAccount] = useState(null);

  const checkUsername = (event)=>{

    axios.get("http://localhost:4000/accounts/"+event.target.value)
      .then(function (response) {
        setIsRegisterBtnShowing(false);
        let username = (event.target.value).split(' ');
        username[0]?document.getElementById("invalidUser").style.display="inline":document.getElementById("invalidUser").style.display="none";
        console.log(response);
      })
      .catch(function (error) {
        setIsRegisterBtnShowing(true);
        document.getElementById("invalidUser").style.display="none";
        console.log(error);
      });
  }

  const checkEmail = (event)=>{
    let email = (event.target.value).split(' ')[0];
    // eslint-disable-next-line
    var newRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    email.match(newRegex)?document.getElementById("invalidEmail").style.display="none":document.getElementById("invalidEmail").style.display="inline";
  }

  //eslint-disable-next-line
  const [inputValues, setInputValues] = useState({
    id:"",
    password: "",
    name:"",
    surname: "",
    email: "",
    phone: "",
    list:[]
  });

  const add = () => {
    setIsRegisterBtnShowing(false);
    const updatedInputValues = {
      id:document.getElementById("id").value,
      password: document.getElementById("password").value,
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      list:[]
    };

    setInputValues(updatedInputValues);

    axios.post("http://localhost:4000/accounts", updatedInputValues)
      .then(function (response) {
        console.log(response);
        setUserAdded(true);
        document.getElementById("id").value ="";
        document.getElementById("password").value ="";
        document.getElementById("name").value ="";
        document.getElementById("surname").value ="";
        document.getElementById("email").value ="";
        document.getElementById("phone").value ="";
        setIsRegisterBtnShowing(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="regContainer">
        <div className="formStyles w3-round-large  w3-card-4" >
          <h1 style={{fontWeight:'500'}} className="w3-text-blue">Registration</h1>
          <div style={{display:'flex'}}>
            <div style={{marginRight:'2vw'}}>
              <label htmlFor="id">Username</label><br />
              <input type="text" id="id" onChange={checkUsername}/>
              <br /><span className="w3-text-red" id="invalidUser" style={{display:'none'}}>* This username already exists.</span><br />
              <label htmlFor="name">Name</label><br />
              <input type="text" id="name" />
              <br /><br />
              <label htmlFor="email">Email</label><br />
              <input type="email" id="email" onChange={checkEmail}/>
              <br /><span className="w3-text-red" id="invalidEmail" style={{display:'none'}}>* This is not a valid email address.</span><br />
            </div>
            <div>
              <label htmlFor="id">Password</label><br />
              <input type="password" id="password" />
              <br /><br />
              <label htmlFor="surname">Surname</label><br />
              <input type="text" id="surname" />
              <br /><br />
              <label htmlFor="phone">Phone</label><br />
              <input type="text" id="phone" />
              <br /><br />
            </div>
          </div>
          {isRegisterBtnShowing?<button className="w3-btn w3-blue w3-card-4 w3-round-large"  onClick={add} >Register</button>:<button className="w3-btn w3-blue w3-card-4 w3-round-large"  onClick={add} disabled>Register</button> }
        </div>
        {userAdded?<div className="w3-panel w3-green w3-round-small">'You have registered successfully!'</div>:''}
    </div>
  );
}
