import React, {useState} from 'react'
import {initializeApp} from 'firebase/app'
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc, deleteDoc, doc, 

} from 'firebase/firestore'

import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCi48iF8k2XTK8zrFHN2Qzm7WGBu-fOOes",
  authDomain: "woterd-3937a.firebaseapp.com",
  projectId: "woterd-3937a",
  storageBucket: "woterd-3937a.appspot.com",
  messagingSenderId: "908874860023",
  appId: "1:908874860023:web:2188d74c8bf46b78f35af2"
};

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()


const colRef = collection(db, 'plants')

onSnapshot(colRef, (snapshot) => {
  let plants = []

  snapshot.docs.forEach((doc)=>{
    plants.push({...doc.data(), id: doc.id})
  })
  console.log(plants)
})

export default function Form() {
    const [name, setName] = useState("")
    const [des, setDes] = useState("")
    const [id, setId] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addDoc(colRef,{
          name: name,
          description: des,
        })
        setName("");
        setDes("");
    }
    const handleDelete = (e) =>{
      e.preventDefault();
      const docRef = doc(db , 'plants', id)
      deleteDoc(docRef)

      setId("");
    }
    const handleAuth = (e) =>{
      e.preventDefault();

      createUserWithEmailAndPassword(auth, email, pass )
       .then((cred)=>{
          console.log("User created: ",cred.user)
       })
       .catch((err)=>{
         console.log(err.message)
       })
       setEmail('');
       setPass('');
       
    }
  return (
    <>
      <form onSubmit={handleSubmit} className="add">
          <label>
            Name:
            <input type="text" name='name' value={name} onChange={e => setName(e.target.value)} />
            
          </label>
          <label>
            description:
            <input type="text" name="description" value={des}  onChange={e => setDes(e.target.value)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <form onSubmit={handleDelete} className="del">
          <label >
              Plant id:
            
              <input type='text' name='id' value={id} onChange={e=> setId(e.target.value)} required />

              <input type="submit" value="Delete" />
            </label>

        </form>
        <form onSubmit={handleAuth} className="auth">
          <label >
              Emial:
            
              <input type='text' name='email' value={email} onChange={e=> setEmail(e.target.value)} required />

            </label>
          <label >
              Password:
            
              <input type='password' name='pass' value={pass} onChange={e=> setPass(e.target.value)} required />

            </label>
            
              <input type="submit" value="Login" />

        </form>

    </>
    
  )
}





