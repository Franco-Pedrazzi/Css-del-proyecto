//Franco Pedrazzi y Luca Wlodarczyk
import { useState, React, useContext } from 'react';
import './SingUpAndLogin.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from './db';
import { Account } from '../AppContext';


const auth = getAuth(app);
const db = getFirestore(app);

function Signup() {
  const {AccountData, SetAccountData}=useContext(Account)
  const [MakingAccount, SetMakingAccount] = useState({
    Name: "",
    LastName: "",
    Age: "",
    Gmail: "",
    Password: "",
    CPassword: ""
  });

  const [error, SetError] = useState({
    Name: "",
    LastName: "",
    Age: "",
    Gmail: "",
    Password: "",
    CPassword: ""
  });

  const DatasNames = ["Name", "LastName", "Age", "Gmail", "Password", "CPassword"];

  const AddDataUser = async (id) => {
    console.log(id);
    await setDoc(doc(db, "Users", id), {
      name: MakingAccount.Name,
      LastName: MakingAccount.LastName,
      Age: MakingAccount.Age
    });
  };

  const Submit = async (event) => {
    event.preventDefault();

    for (let i = 0; i < 6; i++) {
      const dataName = DatasNames[i];


      if (MakingAccount[dataName] === "") {
        SetError({ ...error, [dataName]: "Complete este valor" });
        return;
      } else {
        SetError({ ...error, [dataName]: "" });
      }
    }

    if (MakingAccount.Password !== MakingAccount.CPassword) {
      SetError({ ...error, CPassword: "La contraseña no coincide" });
      return; 
    }
    
    await createUserWithEmailAndPassword(auth, MakingAccount.Gmail, MakingAccount.Password)
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
          SetError({ ...error, Gmail: "La cuenta ya está en uso" });
        }
      });
      await signInWithEmailAndPassword(auth, MakingAccount.Gmail, MakingAccount.Password)
      .then((userCredential) => {
        AddDataUser(userCredential["user"].uid)
        SetAccountData({id:userCredential["user"].uid})
      })
      .catch(() => {
        SetError("No se a podido acceder a tu cuenta verifica la contraseña y el mail")
      });
  };

  const Handle = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    SetMakingAccount({
      ...MakingAccount, [name]: value
    });

    if (value !== "") {
      SetError({
        ...error,
        [name]: "" 
      });
    }
  };

  return (
    <>
      <div className="popup">
        <div>
          <form onSubmit={Submit}>
            <h3>Nombre:</h3>
            <input className={"SignupInputs"}
              onChange={Handle}
              name='Name'
              type='text'
            ></input>
            <h5 className="error">{error.Name}</h5>

            <h3>Apellido:</h3>
            <input className={"SignupInputs"}
              onChange={Handle}
              name='LastName'
              type='text'
            ></input>
            <h5 className="error">{error.LastName}</h5>

            <h3>Edad:</h3>
            <input className={"SignupInputs"}
              onChange={Handle}
              name='Age'
              type='number'
            ></input>
            <h5 className="error">{error.Age}</h5>

            <h3>Gmail:</h3>
            <input className={"SignupInputs"}
              onChange={Handle}
              name='Gmail'
              type='email'
            ></input>
            <h5 className="error">{error.Gmail}</h5>

            <h3>Contraseña:</h3>
            <input className={"SignupInputs"}
              onChange={Handle}
              name='Password'
              type='password'
            ></input>
            <h5 className="error">{error.Password}</h5>

            <h3>Confirmar Contraseña:</h3>
            <input className={"SignupInputs"}
              onChange={Handle}
              name='CPassword'
              type='password'
            ></input>
            <h5 className="error">{error.CPassword}</h5> {/* Mensaje de error de confirmación de contraseña */}
            <button className="SignupButton" type='Submit'><b>→</b> Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
