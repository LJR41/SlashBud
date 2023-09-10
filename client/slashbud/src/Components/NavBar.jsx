import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()
    const [loggedUser, setLoggedUser] = useState("")
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
            .then(res => {
                console.log(res)
                setLoggedUser(res.data.user)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const GoProfile = ()=>{
        const id = loggedUser._id;
        navigate(`/profile/${id}`)

    }
    const logout = (e) => {
        axios.get('http://localhost:8000/api/users/logout', { withCredentials: true })
            .then(res => {
                console.log(res)
                navigate('/register')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div class="flex ... justify-around ... bg-gradient-to-r from-cyan-300 to-purple-300">
            <div>
                <img class="logo" src="https://cdn.discordapp.com/attachments/616397259361353749/1144415696990785586/SlashBud9.jpg" alt=" Logo" />
            </div>
            <h1 className='letters'>SlashBud</h1>
            <div class=" align-center mt-2">
                <a href='/' class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Home</a>
                <a href='/alllist' class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">List</a>
                <a href='/games' class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Games</a>
                <a href='/characters' class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Characters</a>
                {/* <a href={setLoggedUser._id} class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Profile</a> */}
                <button onClick={GoProfile} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Profile</button>
                <button onClick={logout} class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Logout</button>
            </div>
        </div>
    )
}

export default NavBar