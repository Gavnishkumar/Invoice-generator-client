import React, { useEffect, useState } from 'react';
import axios,{AxiosResponse} from 'axios';
import { validateEmail } from './Regex/MyRegex';
import { Link, useNavigate } from 'react-router-dom';
const SignUp: React.FC = () => {
  const navigate= useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('authToken')){
      navigate('/')
    }
  })
  interface User {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}
// const validateEmail=(email: string): boolean =>{
//   const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   return regex.test(email);
// }
  const [isValidEmail,setIsValidEmail]= useState<boolean>(true)
  const [checkPassword,setCheckPassword]= useState<boolean>(true)
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name==='email' && validateEmail(value)===false  && value!==''){
      setIsValidEmail(false);
    }
    else{
      setIsValidEmail(true);
    }

    if(name==='confirmPassword' && formData.password!==value){
      setCheckPassword(false);
    }
    else{
      setCheckPassword(true);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    interface UserData {
      id: string;
      name: string;
      email: string;
      token: string;
    }
    const userRequest={
      name:formData.name,
      email: formData.email,
      password: formData.password
    }
   
  
    axios.post<UserData>('https://invoice-generator-backend-lf5d.onrender.com/api/user/signup',{params: userRequest})
      .then((response: AxiosResponse<UserData>) => {
        navigate('/login')
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
      
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            style={{ borderColor: isValidEmail ? '#ccc' : 'red' }}
            required
          />
          {!isValidEmail && <p style={{ color: 'red' }}>Invalid email address</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ borderColor: checkPassword ? '#ccc' : 'red' }}
            required
          />
          {!checkPassword && <p style={{ color: 'red' }}>Both password must be same</p>}
        </div>
        <button type="submit">Sign Up</button>
        <span className='having-account'>Already have account <Link to='/login' style={{textDecoration:'none'}}>Sign in</Link></span>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
