import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function MyList({ user, setUser}){
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
        id:"",
        password: "",
        name:"",
        surname: "",
        email: "",
        phone: "",
        list:[]
      });

    const addToList = ()=>{

        axios.get("http://localhost:4000/accounts/"+user.id)
        .then(function (result) {
            setInputValues(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });


        let list = inputValues.list;
        list.push({
            "id": generateRandomString(),
            "task": document.getElementById("task").value,
            "priority": document.getElementById("priority").value,
            "deadline": document.getElementById("deadline").value
          });
        
        axios.patch("http://localhost:4000/accounts/"+inputValues.id, inputValues)
        .then(response => {console.log(response.data)})
        .catch(error => console.error(error));
    }

    const remove = (listItem)=>{
        let list = user.list;
        list = list.filter((tasks)=>tasks.id!==listItem);
        
        axios.patch("http://localhost:4000/accounts/"+user.id, {"list":list})
        .then(response => {console.log(response.data)})
        .catch(error => console.error(error));
    }

    const update = (listItem)=>{
        
    }

    return(
        <div className='mylistContainer'>
            <div style={{width:"50vw"}}>
                <h1>To Do List</h1>
                
                <div className='listFormat'>
                    <div style={{width:"20vw"}}>Deadline</div>
                    <div style={{width:"50vw"}}>Task</div>
                    <div style={{width:"20vw"}}>Priority</div>
                    <div style={{width:"10vw"}}>Edit</div>
                </div>
                {user?
                <div>
                    {user.list.length?user.list.map((items)=>(
                        <div key={items.id} className='listFormat'>
                            <div style={{width:"20vw"}}>{items.deadline}</div>
                            <div style={{width:"50vw"}}>{items.task}</div>
                            {setPriority(items.priority)}
                            <div style={{width:"10vw",display:'flex',justifyContent:'space-evenly'}}>
                                <button style={{fontSize:'large',marginRight:'1vw'}} onClick={() => update(items.id)}>&#9998;</button>
                                <button style={{fontSize:'x-large'}} onClick={() => remove(items.id)}>&#128465;</button>
                            </div>
                        </div>
                    )):
                    <div>
                    No list items.<br/>
                </div>
                    }
                </div>
                :
                <div>
                    No list items.<br/>
                    <button onClick={() => navigate('/')}>Log in</button>
                </div>

                }
            </div>

            <div style={{width:"30vw"}}>
                <h1>Add tasks to the list.</h1>
                <label htmlFor="task">Task</label><br />
                <input type="text" id="task" name="task"/><br /><br />

                <label htmlFor="priority">Priority</label><br />
                <select name='priority' id='priority'>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                </select>    
                <br /><br />
                <label htmlFor="deadline">Deadline</label><br />
                <input type="date" id="deadline"/><br /><br />
                <button onClick={addToList}>Add to list</button><br /><br />
            </div>
        </div>
    );
}

function setPriority(priorityNum)
{
    if(priorityNum==='Low'){
        return(
            <div className='w3-green' style={{width:"20vw"}}>Low</div>
        );
    }
    if(priorityNum==='Medium'){
        return(
            <div className='w3-orange' style={{width:"20vw"}}>Medium</div>
        );
    }
    if(priorityNum==='High'){
        return(
            <div className='w3-red' style={{width:"20vw"}}>High</div>
        );
    }
}

function generateRandomString(){
    const characters = '0123456789';
    let randomString = '';
  
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
    
    return randomString;
  };