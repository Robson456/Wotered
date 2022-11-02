import React, {useState} from 'react'
import {initializeApp} from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc, deleteDoc, doc, setIndexConfiguration

} from 'firebase/firestore'

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

const colRef = collection(db, 'plants')



getDocs(colRef)
.then((snapshot)=> {
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

    const handleSubmit = (e) => {
        // e.preventDefault();
        // alert('submiting new name '+ name)
        addDoc(colRef,{
          name: name,
          description: des,
        })
        
        
        
        console.log(name)
    }
    const handleDelete = (e) =>{
      // e.preventDefault();

      const docRef = doc(db , 'plants', id)

      deleteDoc(docRef)
      

      
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
    </>
    
  )
}





