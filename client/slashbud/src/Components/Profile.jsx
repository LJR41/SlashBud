import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Profile = () => {

    const [oneUser, setOneUser] = useState([])
    const [listId, setListId] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/lists/${id}`)
            .then(res => {
                setOneUser(res.data)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <div>
            <NavBar />
            <div className='flex ... border-solid border-2 border-black ...'>
                <div>
                    <h1>{oneUser.firstName}</h1>
                </div>
                <div>
                    <h1>{oneUser.firstName}</h1>
                </div>
                <div >
                    <h1>{oneUser.firstName}</h1>
                </div>
            </div>
            <div className='flex ... border-solid border-2 border-black ...'>
                <div>
                    <h1>{oneUser.lastName}</h1>
                </div>
            </div>
            <div className='flex ... border-solid border-2 border-black ...'>
                <h1>{oneUser.displayName}</h1>
            </div>
        </div>
    )
}

export default Profile