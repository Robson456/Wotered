import React, {useState} from 'react'
import {
  collection,
  addDoc, deleteDoc, doc
} from 'firebase/firestore'
import db from '../firebase/init'
import {getAuth} from 'firebase/auth'

const auth = getAuth()


export default function Form() {
  const [name, setName] = useState("")
  const [des, setDes] = useState("")
  const [id, setId] = useState("")

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

  return (
    <>
        <form onSubmit={handleSubmit} className="add">
          <h2>Add Plant</h2>
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
        <h2>Delete Plant</h2>
          <label >
              Plant id:
            
              <input type='text' name='id' value={id} onChange={e=> setId(e.target.value)} required />

              <input type="submit" value="Delete" />
            </label>

        </form>
      
    </>
    
  )
}





