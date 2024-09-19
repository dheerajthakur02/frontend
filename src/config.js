import { initializeApp } from 'firebase/app';
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBIEENLrzUhCZxdu__Uw1C9FYM0JuYwzN8",
    authDomain: "frontend-f84a3.firebaseapp.com",
    projectId: "frontend-f84a3",
    storageBucket: "frontend-f84a3.appspot.com",
    messagingSenderId: "19364223265",
    appId: "1:19364223265:web:87c3d2cbab023830ba0660"
};

const app = initializeApp(firebaseConfig);

export const imageDb=getStorage(app);




