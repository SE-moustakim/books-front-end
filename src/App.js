import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";


function MainPage(){
    return(
        <div>
           <Navbar/>
        </div>
    )
}


function App() {
  return (
    <MainPage/>
  );
}

export default App;
