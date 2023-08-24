import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Form from './Form'
import NavBar from './NavBar'

const AllListPage = () => {
    const [listList, setListList] = useState([])
    const [listId, setListId] = useState([])
    const { id } = useParams()

    useEffect(() => {
        // Fetch the user's lists based on their ID
        axios.get(`http://localhost:8000/api/lists/${id}`)
            .then(response => {
                setListList(response.data)
                setListId(response.data.lists)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="main_container">
            <NavBar />

            {/* container for Create New List Form */}
            <div>
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
                        listId ?
                            <div>
                                {listId.map((eachList) => (
                                    <tr key={eachList._id} className='hover'>
                                        <td>
                                            <Link to={`/onelist/${listId._id}`} className='link'>
                                                {eachList.listName}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </div>
                            : <p></p>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default AllListPage