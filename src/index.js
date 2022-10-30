import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {initializeApp} from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs

} from 'firebase/firestore'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

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