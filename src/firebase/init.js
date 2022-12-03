import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCi48iF8k2XTK8zrFHN2Qzm7WGBu-fOOes",
    authDomain: "woterd-3937a.firebaseapp.com",
    projectId: "woterd-3937a",
    storageBucket: "woterd-3937a.appspot.com",
    messagingSenderId: "908874860023",
    appId: "1:908874860023:web:2188d74c8bf46b78f35af2"
  };

  initializeApp(firebaseConfig)
const db = getFirestore();
export default db 