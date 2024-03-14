import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Navbar: React.FC = () => {
    const navigate=useNavigate();
    const data:string|null=localStorage.getItem('authToken');
    const [isLoggedIn,setIsLoggedIn] = useState<boolean> ();

   useEffect(() => {
     if(!localStorage.getItem('authToken')){
        setIsLoggedIn(false)
        // navigate('/login')
     }
     else{
        setIsLoggedIn(true)
     }
   },[isLoggedIn,navigate,data])
   
   const onLogout=()=>
   {
    if(localStorage.getItem('authToken')){
        localStorage.removeItem('authToken');
        setIsLoggedIn(false)
        navigate('/login')
    }
   }
   const onLogin=()=>{
    setIsLoggedIn(true)
    navigate('/login')
   }
   const onSignUp=()=>{
    navigate('/signup')
   }
  return (
    <nav className="navbar">
      <div className="navbar-logo">Levitnation</div>
      <ul className="navbar-links">
        <li className="navbar-item">
          <a href="/" className="navbar-link">Home</a>
        </li>
        <li className="navbar-item">
          <a href="/about" className="navbar-link">About</a>
        </li>
        <li className="navbar-item">
          <a href="/contact" className="navbar-link">Contact</a>
        </li>
      </ul>
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <button className="logout-button" onClick={onLogout}>Logout</button>
        ) : (
            <div style={{display:'flex'}}>
          <button className="login-button" onClick={onLogin}>Login</button>
          <button className="login-button" onClick={onSignUp}>SignUp</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
