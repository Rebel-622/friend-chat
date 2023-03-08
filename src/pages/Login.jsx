import React,{useEffect, useState} from 'react'
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import { loginRoute } from '../utils/AllRoutes';
function Login() {
    const [passwordType, setPasswordType] = useState("password");
    const [icon, setIcon] = useState("fa-regular fa-eye-slash");

    const showHidePassword = ()=>{
        if(passwordType==="password"){
            setIcon("fa-regular fa-eye")
            setPasswordType("text")
        }else{
            setIcon("fa-regular fa-eye-slash")
            setPasswordType("password")
        }
    }
    const navigate = useNavigate();
    const [values,setValues] = useState({
        username:"",
        password:"",
    });

    const toastOption = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark',
    }
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate('/')
        }
    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            console.log("in validation",loginRoute)
            const {password,username} = values;
            const {data} = await axios.post(loginRoute,{
                username,
                password,
            });
            if(data.status===false){
                toast.error(data.msg,toastOption)
            }
            if(data.status===true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user))
                toast.success("User Created Sucessfully",toastOption);
                navigate("/");
            }
        }
    };

    const handleValidation = ()=>{
        const {password,username} = values;
        if(password ===""){
            toast.error("Password is required",
            toastOption
            );
            return false;
        }else if(username ===""){
            toast.error("username and password required",
            toastOption
            );
            return false;
        }else if(password.length<8){
            toast.error("Password Should be equale or greater than 8 characters",
            toastOption
            );
            return false;
        }
        return true;
    }

    const handleChange = (event)=>{
        setValues({...values,[event.target.name]:event.target.value});
    };
    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={Logo} alt='Logo' />
                        <h1>Friend-Chat</h1>
                    </div>
                    <input
                        type="text"
                        placeholder='Username'
                        name='username'
                        onChange={(e) => handleChange(e)} />

                    <div className='wrapper'>
                    <input
                        type={passwordType}
                        placeholder='Password'
                        name='password'
                        onChange={(e) => handleChange(e)}/>
                        <span onClick={showHidePassword}><i className={icon}></i></span>
                    </div>
                        <button type='submit'>Login</button>
                        <span>
                            already have an account ? <Link to="/register">register</Link>
                        </span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  .brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem;
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
  }
  form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color: #00000076;
    border-radius:2rem;
    padding: 3rem 5rem;
    input{
        background-color:transparent;
        padding: 1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;
        }
    }
    button{
        background-color:#997af0;
        color:white;
        padding: 1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }
    span{
        color:white;
        text-transform: uppercase;
        a{
            color:#4e0eff;
            text-decoration:none;
            font-weight:bold;
        }
    }
  }
`;

export default Login