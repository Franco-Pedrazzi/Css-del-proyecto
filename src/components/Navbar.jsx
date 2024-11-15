import './Navbar.css';
import './SingUpAndLogin.css'
import Login from "./Login";
import { useContext, useEffect, useState } from 'react';
import Signup from "./Signup";
import {doc, getDoc } from "firebase/firestore";
import { db } from './db';
import icon from "../../public/img/LogoV3.svg"
import { Account } from '../AppContext';
import Account_Config from './Account_Config';
function Navbar() {
  const {AccountData, SetAccountData}=useContext(Account)
    const [SignupIsOpen, SetSignupIsOpen] = useState(false);
    const [LoginIsOpen, SetLoginIsOpen] = useState(false);
    const [Account_ConfigIsOpen, SetAccount_ConfigIsOpen] = useState(false)
useEffect(()=>{

  SetAccountData(JSON.parse(localStorage.getItem("Account")));
console.log(AccountData);

},[])

    return (
        <nav>
            {SignupIsOpen && <div className='background' onClick={() => SetSignupIsOpen(false)}>
                .
            </div>}
            {LoginIsOpen && <div className='background' onClick={() => SetLoginIsOpen(false)}>
                .
            </div>}
            {Account_ConfigIsOpen && <div className='background' onClick={() => Account_ConfigIsOpen(false)}>
                .
            </div>}
            {SignupIsOpen && <Signup ></Signup>}
            {LoginIsOpen && <Login ></Login>}
            {Account_ConfigIsOpen && <Account_Config ></Account_Config>}
            <img id="logo" src={icon} ></img>
            <ul>
                <li><a className='buttonNav' href="/">Home</a></li>
                <li><a className='buttonNav' href="/Categorias">Genres</a></li>
                <li><a className='buttonNav' href="/Descripcion">Description</a></li>
                <li><a className='buttonNav' href="/Preguntas">Questions</a></li>
                <li><a className='buttonNav' href="#">Favorites</a></li>
            </ul>
            {AccountData.id==false ? (
                <div>

              <button onClick={() => { SetLoginIsOpen(true) }} id="Login">Login</button>
                <button onClick={() => { SetSignupIsOpen(true) }} id="register">Signup</button>
            </div>
            ) : (
                <div>

                <h3>{AccountData.name} <img onClick={()=>SetAccount_ConfigIsOpen(true)}style={{width:"50px",height:"25px"}} src="../public/img/user-icon.webp"/></h3>
            </div>
            )
                
            }
           
        </nav>
    );
}

export default Navbar;