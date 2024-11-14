import './Navbar.css';
import './SingUpAndLogin.css'
import Login from "./Login";
import { useContext, useEffect, useState } from 'react';
import Signup from "./Signup";
import {doc, getDoc } from "firebase/firestore";
import { db } from './db';
import icon from "../../public/img/LogoV3.svg"
import { Account } from '../AppContext';

function Navbar() {
  const {AccountData, SetAccountData}=useContext(Account)
    const [SignupIsOpen, SetSignupIsOpen] = useState(false);
    const [LoginIsOpen, SetLoginIsOpen] = useState(false);

useEffect(()=>{
  console.log(AccountData.length)
  SetAccountData(localStorage.getItem("Account"))
},[])
    const log=() => {
      if(AccountData.length>1){
        return
      }

        async function fetchData() {
          try {
            const docRef = doc(db, "Users", AccountData.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              SetAccountData(docSnap.data());
                localStorage.setItem("Account", Account);
            } else {
              console.log("No se encontró el documento");
            }
          } catch (error) {
            console.error("Error al obtener el documento:", error);
          }
        }
        fetchData();
      };
    return (
        <nav>
            {SignupIsOpen && <div className='background' onClick={() => SetSignupIsOpen(false)}>
                .
            </div>}
            {LoginIsOpen && <div className='background' onClick={() => SetLoginIsOpen(false)}>
                .
            </div>}
            {SignupIsOpen && <Signup ></Signup>}
            {LoginIsOpen && <Login ></Login>}
            <img id="logo" src={icon} ></img>
            <ul>
                <li><a className='buttonNav' href="/">Home</a></li>
                <li><a className='buttonNav' href="/Categorias">Genders</a></li>
                <li><a className='buttonNav' href="/Descripcion">Description</a></li>
                <li><a className='buttonNav' href="/Preguntas">Questions</a></li>
                <li><a className='buttonNav' href="#">Favorites</a></li>
            </ul>
            {AccountData.length<=1? (
                <div>
             
                <button onClick={() => { SetSignupIsOpen(true) }} id="register">Signup</button>
            </div>
            ) : (
                <div>
                {log()}
                <h3>{AccountData.name} <img style={{width:"50px",height:"25px"}} src="../public/img/user-icon.webp"/></h3>
            </div>
            )
                
            }
           
        </nav>
    );
}

export default Navbar;