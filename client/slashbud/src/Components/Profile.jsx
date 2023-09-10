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
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <div>
            <NavBar />
            <div className='flex ... border-solid border-2 border-black ...'>
                <div className='flex ... border-solid border-2 border-black ...'>
                    <h1>Welcome, {oneUser.displayName}</h1>
                </div>
                <div>
                    <table class="border-separate border-spacing-2 border border-slate-500 ...">
                        <thead>
                            <tr>
                                <th class="border border-slate-600 ...">Name</th>
                                <th class="border border-slate-600 ...">Email</th>
                                <th class="border border-slate-600 ...">On Sale</th>
                                <th class="border border-slate-600 ...">Sale Price</th>
                                <th class="border border-slate-600 ...">Normal Price</th>
                                <th class="border border-slate-600 ...">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="mb-12 size">
                            <tr>
                                <td class="border border-slate-700 ..."> {oneUser.firstName} {oneUser.lastName}</td>
                                <td class="border border-slate-700 ..."> {oneUser.email}</td>
                                <td class="border border-slate-700 ..." ></td>
                                <td class="border border-slate-700 ..." ></td>
                                <td class="border border-slate-700 ..." ></td>
                                <td class="border border-slate-700 ..." >
                                    <select name="lists" id="">
                                        <option hidden value="">Add to List</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Profile