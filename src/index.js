import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import './index.css';
import App from './App';
import { DbContext } from './dbContext';

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGE_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
};

const fb = initializeApp(firebaseConfig);
const db = getFirestore(fb);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DbContext.Provider value={db}>
    <App />
    </DbContext.Provider>
  </React.StrictMode>
);

