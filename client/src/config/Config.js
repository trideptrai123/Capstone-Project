// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD3gZGM0gQC7JXjMlbc1se4f9BRCyWu_vM',
  authDomain: 'capstone-project-6a6b9.firebaseapp.com',
  projectId: 'capstone-project-6a6b9',
  storageBucket: 'capstone-project-6a6b9.appspot.com',
  messagingSenderId: '631654843922',
  appId: '1:631654843922:web:caf058d12413b149c1bacb',
  measurementId: 'G-HV39THNV79',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
