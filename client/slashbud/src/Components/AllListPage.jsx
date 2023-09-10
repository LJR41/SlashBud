import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Form from './Form'
import NavBar from './NavBar'

const AllListPage = () => {
    const [listList, setListList] = useState([])
    const [listId, setListId] = useState([])
    // const { id } = useParams()
    const [toggleRefresh, setToggleRefresh] = useState(false)
    const [childId, setChildId] = useState("")

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
            const response = await axios.get(`http://localhost:8000/api/lists/${res.data.user._id}`)
            const ListList = response.data
            const ListId = response.data.lists
            setListList(ListList)
            setListId(ListId)
        }



        getUser()
    }, [toggleRefresh])

    const refreshPage = () => {
        setToggleRefresh(!toggleRefresh)
    }



    //since we do not have user logged in/params set up use this:
    //http://localhost:3000/alllist/64e51899ba60ceb812b11c30


    return (
        <div className="main_container bg-gradient-to-r from-cyan-600 to-purple-500 ... space p-4  tall">
            <NavBar />

            {/* container for Create New List Form */}
            <div className="move ...ring-offset-4 ring-4 items-center justify-center max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700e">
                <Form refreshPage={refreshPage} />
            </div>

            {/* container for Your Lists section */}


            <label htmlFor="listTable" > <h4 className="text-xl font-bold mb-4 text-white">Your Lists</h4></label>
            <table name="listTable" className='right move ...ring-offset-4 ring-4 items-center justify-center max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700e'>
                <thead>
                    <tr>
                        <th className="p-3 text-center bg-gray-200">List Name</th>
                        <th className="p-3 text-center bg-gray-200">Type</th>
                        <th className="p-3 text-center bg-gray-200">Display</th>
                        <th className="p-3 text-center bg-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listId ? (
                        listId.map((eachList) => (
                            <tr key={eachList._id} className='hover '>
                                <td className="p-3 border">{eachList.listName}</td>
                                <td className="p-3 border">
                                    {eachList.isCharacters ? (
                                        <span>Characters</span>
                                    ) : eachList.isGames ? (
                                        <span>Games</span>
                                    ) : (
                                        <span>N/A</span>
                                    )}
                                </td>
                                <td className="p-3 border">
                                    {eachList.isPublic ? (
                                        <span>Public</span>
                                    ) : (
                                        <span>Private</span>
                                    )}
                                </td>
                                <td className="p-3 border">
                                    <Link to={`/onelist/${eachList._id}`} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 "> View List </Link> 
                                    <Link to={`/edit/${eachList._id}`} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 "> Edit List </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="p-3 border">No lists found</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}

export default AllListPage