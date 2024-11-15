import { useState, React, useContext } from 'react';
import './SingUpAndLogin.css'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from './db';
import { doc, getDoc } from "firebase/firestore";
import { db } from './db';
const auth = getAuth(app)
import { Account } from '../AppContext';
function Login() {
  const { AccountData, SetAccountData } = useContext(Account)
  const [LoadingAccount, SetLoadingAccount] = useState({
    Gmail: "",
    Password: ""
  })
  const [error, SetError] = useState("")
  const log = (id) => {
    console.log(id)
    async function fetchData() {
      try {
        const docRef = doc(db, "Users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          SetAccountData(docSnap.data());

          localStorage.setItem("Account", JSON.stringify(docSnap.data()));

        } else {
          console.log("No se encontró el documento");
        }
      } catch (error) {
        console.error("Error al obtener el documento:", error);
      }
    }
    fetchData();
  };
  const Submit = (event) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, LoadingAccount.Gmail, LoadingAccount.Password)
      .then((userCredential) => {
        log(userCredential["user"].uid)
      })
      .catch(() => {
        SetError("No se ha podido acceder a tu cuenta verifica la contraseña y el mail")
      });

  }
  const Handle = (event) => {
    let name = event.target.name
    let value = event.target.value
    SetLoadingAccount({
      ...LoadingAccount, [name]: value
    })
  }
  return (
    <>
      <div className="popup">

        <div>
          <form onSubmit={Submit}>
            <h5 className="error">{error}</h5>
            <h3>Mail:</h3>
            <input className={"SignupInputs"}
              onChange={Handle}
              name='Gmail'
              type='email'
            ></input>
            <h3>Contraseña:</h3>
            <input className={"SignupInputs"}
              onChange={Handle}
              name='Password'
              type='password'
            ></input>
            <br></br>
            <button className="SignupButton" type='Submit'><b>→</b> Sign Up</button>
            <br></br>
            <br></br>
          </form>
        </div>
      </div>
    </>
  );
};


export default Login;