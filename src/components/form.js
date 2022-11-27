import React, {useState} from 'react'
import {initializeApp} from 'firebase/app'
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc, deleteDoc, doc, setDoc

} from 'firebase/firestore'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged,
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


onAuthStateChanged(auth, (user)=>{
  if(user){
    console.log('user status changed ',user.email, user.uid)
    onSnapshot(collection(db,`users/${user.uid}/plants`), (snapshot) => {
      let plants = []
      snapshot.docs.forEach((doc)=>{
        plants.push({...doc.data(), id: doc.id})
      })
      console.log(plants)
      
    })
    
    
  }else{
    console.log("PLS Login")
  }
})


export default function Form() {
  const [name, setName] = useState("")
  const [des, setDes] = useState("")
  const [id, setId] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

//add plant
const handleSubmit = (e) => {
  const user = auth.currentUser;
      e.preventDefault();
      console.log("user id " + user.uid)
      addDoc(collection(db, `users/${user.uid}/plants`),{
        name: name,
        description: des,
        
      })
      
      setName("");
      setDes("");
  }

  
   
    //delete plant
    const handleDelete = (e) =>{
      const user = auth.currentUser;
      e.preventDefault();
      const docRef = doc(db ,`users/${user.uid}/plants`, id)
      deleteDoc(docRef)

      setId("");
    }
    //creating user
    const handleAuth = (e) =>{
      e.preventDefault();


      createUserWithEmailAndPassword(auth, email, pass ).then((cred)=>{
        return  setDoc(doc(db, "users", cred.user.uid), {
          email: email,
          password: pass,
          userId: cred.user.uid
        });
       }).then(()=>{
        // console.log("User created: ",cred.user.uid)
        setEmail('');
        setPass('');
       })
       .catch((err)=>{
         console.log(err.message)
       })
       
       
    }
    //loging in user
    const handleLogin=(e)=>{
      e.preventDefault(); 

      signInWithEmailAndPassword(auth, email, pass)
        .then((cred)=>{
          console.log('user logged in ', cred.user)
        })
        .catch((err)=>{
          console.log(err.message)
        })
        setEmail('');
        setPass('');
    }
    //login out user
    const logout=()=>{

      signOut(auth)
        .then(()=>{
          console.log('log out')
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
          <h3>Signup</h3>
          <label >
              Emial:
            
              <input type='text' name='email' value={email} onChange={e=> setEmail(e.target.value)} required />

            </label>
          <label >
              Password:
            
              <input type='password' name='pass' value={pass} onChange={e=> setPass(e.target.value)} required />

            </label>
            
              <input type="submit" value="Signup" />

        </form>

        <form onSubmit={handleLogin} className="login">
        <h3>Login</h3>
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
        <button className='logout' onClick={logout}>logout</button>

    </>
    
  )
}





