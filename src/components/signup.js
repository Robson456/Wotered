import React,{useState} from 'react'
import {collection, onSnapshot, doc, setDoc} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import db from '../firebase/init'
import Card from './card'

const auth = getAuth()


export default function Signup() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [plant, setAllPlants] = useState([])

  onAuthStateChanged(auth, (user)=>{
    if(user){
      console.log('user status changed ',user.email, user.uid)
      
    }else{
      console.log("PLS Login")
    }
  })
  const fetchData = ()=>{
    const user = auth.currentUser;
    onSnapshot(collection(db,`users/${user.uid}/plants`), (snapshot) => {
     const plants = snapshot.docs.map(doc=>({
        data: doc.data(),
        id: doc.id
     }))
      setAllPlants(plants)
      console.log(plants)
      
      })
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
              fetchData()
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
            setAllPlants([]);
        }

  return (
    <>
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
    
        <Card plant={plant}/>
    </>
  )
}
