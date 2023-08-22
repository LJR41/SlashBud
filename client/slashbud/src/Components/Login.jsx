import React, {useState} from 'react'
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
            [e.target.name]:e.target.value
        })
    }

    const [errormsg, setErrormsg] = useState(null)

    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', formInfo, {withCredentials:true})
        .then(res=> {
            console.log(res)
            if(res.data.msg == "success") {
                navigate('/')
            } else {
               setErrormsg(res.data.msg) 
            }
        })
        .catch(err=> {
            console.log(err)
        })
    }
    


  return (
    <div>
        <h2>Login</h2>
        {errormsg? <p style={{color: "red"}}>{errormsg}</p>: ""}
        <form onSubmit={login}>
            <div>
                <label>Email</label>
                <input type='email' name='email' onChange={changeHandler}></input>
            </div>
            <div>
                <label>Password</label>
                <input type='password' name='password' onChange={changeHandler}></input>
            </div>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login