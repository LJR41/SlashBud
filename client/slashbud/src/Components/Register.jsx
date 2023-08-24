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
        <h2 class="text-4xl font-semibold text-gray-900 dark:text-white ... mb-4">Register</h2>
        <form onSubmit={onSubmit} class="w-full max-w-sm">
            <div>
                <label class="block mb-2 text-lg font-medium text-pink-100 dark:text-white">First Name</label>
                <input type='text' name='firstName' onChange={changeHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                {errors.firstName? <p style={{color: "red"}}>{errors.firstName.message}</p>: ""}
            </div>
            <div class="mt-2 ...">
                <label class="block mb-2 text-lg font-medium text-pink-100 dark:text-white">Last Name</label>
                <input type='text' name='lastName' onChange={changeHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                {errors.lastName? <p style={{color: "red"}}>{errors.lastName.message}</p>: ""}
            </div>
            <div class="mt-2 ...">
                <label class="block mb-2 text-lg font-medium text-pink-100 dark:text-white">Username</label>
                <input type='text' name='displayName' onChange={changeHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                {errors.displayName? <p style={{color: "red"}}>{errors.displayName.message}</p>: ""}
            </div>
            <div class="mt-2 ...">
                <label class="block mb-2 text-lg font-medium text-pink-100 dark:text-white">Email</label>
                <input type='email' name='email' onChange={changeHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                {errors.email? <p style={{color: "red"}}>{errors.email.message}</p>: ""}
            </div>
            <div class="mt-2 ...">
                <label class="block mb-2 text-lg font-medium text-pink-100 dark:text-white">Password</label>
                <input type='password' name='password' onChange={changeHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                {errors.password? <p style={{color: "red"}}>{errors.password.message}</p>: ""}
                
            </div>
            <div class="mt-2 ...">
                <label class="block mb-2 text-lg font-medium text-pink-100 dark:text-white">Confirm Password</label>
                <input type='password' name='confirmpassword' onChange={changeHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                {errors.confirmpassword? <p style={{color: "red"}}>{errors.confirmpassword.message}</p>: ""}
            </div>
            <button type='submit' class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ... mt-4">Sign up</button>
        </form>
    </div>
  )
}

export default Register