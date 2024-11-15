import { useState, React, useEffect } from 'react';
import './SingUpAndLogin.css'
import { db } from './db';
import {doc, getDoc,setDoc } from "firebase/firestore";
import { useContext } from 'react';
import { Account } from '../AppContext';
function Account_Config() {
  const {AccountData, SetAccountData}=useContext(Account)
    const [Edit, SetEdit] = useState(false)
    const [values,SetValues]=useState ({
        name:AccountData.name,
        LastName:AccountData.LastName
    })
  
    const Handle=(event)=>{
        const name=event.target.name
        SetValues({
            ...values,[name]:event.target.value
        })
    }
    const Editing=async()=>{
        await setDoc(doc(db, "Users", IdAccount), {
            name: values.name,
            LastName: values.LastName
          });
  SetAccountData({...AccountData,name:values.name,LastName:values.LastName})
    }

   

  return (
    <>
      <div className="popup">
            <center>
            <img src="../public/img/user-icon.webp"  style={{width:"200px",height:"100px"}} />
            <div style={{display:"flex"}}>
           
            {Edit==false? (
                 <h2 >Hi {AccountData.name} {AccountData.LastName}</h2>
            ):(
                <div>
                    <input type="text" value={values.name} name='name' onChange={Handle}/> <input type="text" name='LastName' value={values.LastName} onChange={Handle} />
                    <br />
                    <button onClick={Editing}>done</button>
                    </div>
                
            )

            }
            <img onClick={()=>Edit? SetEdit(false):SetEdit(true)} src="../public/img/edit button.png" alt="" style={{position:"relative",width:"20px",height:"15px",top:"13px",left:"10px"}}/>
            
            </div>
                        </center>
      </div>
    </>
  );
};


export default Account_Config;