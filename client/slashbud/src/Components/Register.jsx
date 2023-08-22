import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const [formInfo, setFormInfo] = useState({
        firstName:"",
        lastName: "",
        displayName: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    const navigate = useNavigate()

    const [errors, setErrors] = useState({

    })

    const changeHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit =(e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/register', formInfo, {withCredentials:true})
        .then(res => {
            console.log(res)
            if(res.data.errors){
                setErrors(res.data.errors)
            }else{
                navigate('/')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <div>
        <h2>Register</h2>
        <form onSubmit={onSubmit}>
            <div>
                <label>First Name</label>
                <input type='text' name='firstName' onChange={changeHandler}></input>
                {errors.firstName? <p style={{color: "red"}}>{errors.firstName.message}</p>: ""}
            </div>
            <div>
                <label>Last Name</label>
                <input type='text' name='lastName' onChange={changeHandler}></input>
                {errors.lastName? <p style={{color: "red"}}>{errors.lastName.message}</p>: ""}
            </div>
            <div>
                <label>Username</label>
                <input type='text' name='displayName' onChange={changeHandler}></input>
                {errors.displayName? <p style={{color: "red"}}>{errors.displayName.message}</p>: ""}
            </div>
            <div>
                <label>Email</label>
                <input type='email' name='email' onChange={changeHandler}></input>
                {errors.email? <p style={{color: "red"}}>{errors.email.message}</p>: ""}
            </div>
            <div>
                <label>Password</label>
                <input type='password' name='password' onChange={changeHandler}></input>
                {errors.password? <p style={{color: "red"}}>{errors.password.message}</p>: ""}
                
            </div>
            <div>
                <label>Confirm Password</label>
                <input type='password' name='confirmpassword' onChange={changeHandler}></input>
                {errors.confirmpassword? <p style={{color: "red"}}>{errors.confirmpassword.message}</p>: ""}
            </div>
            <button type='submit'>Sign up</button>
        </form>
    </div>
  )
}

export default Register