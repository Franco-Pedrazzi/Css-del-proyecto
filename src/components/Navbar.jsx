import './Navbar.css';
import './SingUpAndLogin.css'
import Login from "./Login";
import { useState } from 'react';
import Signup from "./Signup";
import {doc, getDoc } from "firebase/firestore";
import { db } from './db';
function Navbar() {
    const [SignupIsOpen, SetSignupIsOpen] = useState(false);
    const [LoginIsOpen, SetLoginIsOpen] = useState(false);
    const [IdAcount, SetIdAcount] = useState("")
    const [Acount, SetAcount] = useState({})
    const log=() => {
        async function fetchData() {
          try {
            const docRef = doc(db, "Users", IdAcount);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                SetAcount(docSnap.data());
            } else {
              console.log("No se encontró el documento");
            }
          } catch (error) {
            console.error("Error al obtener el documento:", error);
          }
        }
        fetchData();
        console.log(Acount)
      };
    return (
        <nav>
            {SignupIsOpen && <div className='background' onClick={() => SetSignupIsOpen(false)}>
                .
            </div>}
            {LoginIsOpen && <div className='background' onClick={() => SetLoginIsOpen(false)}>
                .
            </div>}
            {SignupIsOpen && <Signup send={SetIdAcount}></Signup>}
            {LoginIsOpen && <Login send={SetIdAcount}></Login>}
            <img id="logo" src="INCLUIR_RUTA_DE_IMAGEN" ></img>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/Principal">Front page</a></li>
                <li><a href="/Categorias">Genders</a></li>
                <li><a href="/Preguntas">Questions</a></li>
                <li><a href="/Descripcion">Description</a></li>
                <li><a href="#">Favorites</a></li>
            </ul>
            {IdAcount=="" ? (
                <div>
                <button onClick={() => SetLoginIsOpen(true)} id="Login">Login</button>
                <button onClick={() => { SetSignupIsOpen(true) }} id="register">Signup</button>
            </div>
            ) : (
                <div>
                {log()}
                <h3 className='AccountName'>{Acount.name}</h3>
            </div>
            )
                
            }
           
        </nav>
    );
}

export default Navbar;