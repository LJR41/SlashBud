import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [formInfo, setFormInfo] = useState({
        email: "",
        password: ""
    })

    const changeHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const [errormsg, setErrormsg] = useState("")

    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', formInfo, { withCredentials: true })
            .then(res => {
                console.log(res)
                if (res.data.msg == "success") {
                    navigate('/')
                } else {
                    setErrormsg(res.data.msg)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }



    return (
        <div>
            <h2 class="text-4xl font-semibold text-gray-900 dark:text-white .. mb-4 ... mt-4">Login</h2>
            {errormsg ? <p style={{ color: "red" }}>{errormsg}</p> : ""}
            <form onSubmit={login}>
                <div class="mt-2 ...">
                    <label class="block mb-2 text-lg font-medium text-pink-100 dark:text-white">Email</label>
                    <input type='email' name='email' onChange={changeHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <div class="mt-4 ...">
                    <label class="block mb-2 text-lg font-medium text-pink-100 dark:text-white">Password</label>
                    <input type='password' name='password' onChange={changeHandler} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                </div>
                <button type='submit' class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ... mt-4">Login</button>
            </form>
        </div>
    )
}

export default Login