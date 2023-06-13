//import axios from "axios";
//import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function MyList({ user, setUser}){
    //eslint-disable-next-line
    const navigate = useNavigate();

    const addToList = ()=>{
        
    }

    return(
        <div className='mylistContainer'>
            <div style={{width:"50vw"}}>
                <h1>To Do List</h1>
                
                <div className='listFormat'>
                    <div style={{width:"20vw"}}>Deadline</div>
                    <div style={{width:"60vw"}}>Task</div>
                    <div style={{width:"20vw"}}>Priority</div>
                </div>
                {user?
                <div>
                    {user.list.map((items)=>(
                        <div key={items.id} className='listFormat'>
                            <div style={{width:"20vw"}}>{items.deadline}</div>
                            <div style={{width:"60vw"}}>{items.task}</div>
                            {setPriority(items.priority)}
                        </div>
                    ))}
                </div>
                :
                'No list items.'
                }
            </div>
            <div style={{width:"30vw"}}>
                <h1>Add tasks to the list.</h1>
                <label htmlFor="name">Task</label><br />
                <input type="text" id="id"/><br /><br />

                <label htmlFor="priority">Priority</label><br />
                <select name='priority' id='priority'>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                </select>    
                <br /><br />
                <label htmlFor="deadline">Deadline</label><br />
                <input type="date" id="deadline"/><br /><br />
            </div>
        </div>
    );
}

function setPriority(priorityNum)
{
    console.log(priorityNum)
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
