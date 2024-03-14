import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from './Regex/MyRegex';
import axios,{AxiosResponse} from 'axios';
const SignUp: React.FC = () => {
  const [isValidEmail,setIsValidEmail]= useState<boolean>(true);
  const navigate=useNavigate();
  let token:string|null=localStorage.getItem('authToken');
  useEffect(()=>{
    if(localStorage.getItem('authToken')){
      navigate('/')
    }
  },[token,navigate])
    interface UserInterface {
        email: string,
        password: string
    }
  const [User, setUser] = useState<UserInterface>({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name==='email' && validateEmail(value)===false  && value!==''){
      setIsValidEmail(false);
    }
    else{
      setIsValidEmail(true);
    }
    setUser({ ...User, [name]: value });
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
      email: User.email,
      password: User.password
    }
  
    await axios.post<UserData>(`https://invoice-generator-backend-lf5d.onrender.com/api/user/login`,{params: userRequest})
    .then((response: AxiosResponse<UserData>) => {
      localStorage.setItem('authToken',JSON.stringify(response.data))
      navigate('/')
    })
    .catch((error) => {
      alert(error.response.data.msg)
    });
    
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'72vh'}}>
    <div className="signup-container">
      <h1>Login</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={User.email}
            placeholder="Email"
            onChange={handleChange}
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
            value={User.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Login</button>
        <span className='having-account'>Do not have account <Link to='/signup' style={{textDecoration:'none'}}>Create account</Link></span>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
