import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Form from './Form'

const AllListPage = () => {
    const [listList, setListList] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:8000/api/lists`)
            .then(response => setListList(response.data))
            .catch(err => console.log(err))
    }, [])


    return (
        <div className="main_container ">


            {/* container for Create New List Form */}
            <div className="container border border-black border-2 mx-auto p-4 bg-gradient-to-r from-cyan-600 to-purple-500 ... space">
                <Form></Form>

            </div>

            {/* container for Your Lists section */}
            <div className="container mx-auto p-4">
                <h4 className="text-xl font-bold mb-4">Your Lists</h4>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>List Name</th>
                        <th>Type</th>
                        <th>Display</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listList.map((eachList) => (
                            <tr key={eachList._id} className='hover'>
                                <td><Link to={`/onelist/${eachList._id}`} className='link'>{eachList.listName}</Link></td>
                                <td>{eachList.isCharacters}</td>
                                <td>{eachList.isPublic}</td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>

        </div>




    )
}

export default AllListPage