import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0lZ3Po28qt8JIaD4w_GJdgovseBcZyUw",
  authDomain: "plancation-74a7a.firebaseapp.com",
  projectId: "plancation-74a7a",
  storageBucket: "plancation-74a7a.appspot.com",
  messagingSenderId: "33008958055",
  appId: "1:33008958055:web:91c5ab620dd69f6b6832c2",
  measurementId: "G-07THDVQF70"
};

// Initialize Firebase
export const firebaseApp = () => initializeApp(firebaseConfig);
