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
        const getUser = async()=>{
            const res = await axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
            const userData = res.data.user
            const userId = await userData._id
            const id = {userId}
            setChildId(id)
        const response = await axios.get(`http://localhost:8000/api/lists/${childId.userId}`)
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
        <div className="main_container">
            <NavBar ></NavBar>

            {/* container for Create New List Form */}
            <div>
                <Form refreshPage={refreshPage} />
            </div>

            {/* container for Your Lists section */}
            <div className="container mx-auto p-4">
                <h4 className="text-xl font-bold mb-4">Your Lists</h4>
            </div>

            <table className='table w-full border-collapse border'>
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
                            <tr key={eachList._id} className='hover'>
                                <td className="p-3 border"><Link to={`/onelist/${eachList._id}`} className='link'>{eachList.listName}</Link></td>
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