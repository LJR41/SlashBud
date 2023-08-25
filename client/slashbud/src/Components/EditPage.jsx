import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import NavBar from './NavBar'

const EditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [oneList, setOneList] = useState([])
    const [listItems, setListItems] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/lists/one/${id}`)
            .then(response => {
                setOneList(response.data)
                setListItems(response.data.listObjects)
            })
            .catch(err => console.log(err))
    }, [])

    //   const handleSubmit = (e) => {
    //     e.preventDefault()
    //     axios.patch(`http://localhost:8000/api/lists/one/${id}`,
    //         {

    //         })
    //         .then(response => {
    //             navigate(`/onelist/${response.data._id}`)
    //         })
    //         .catch(err => console.log(err))
    // }


    // http://localhost:3000/edit/64e81fae66671b2cc5de73f8

    return (
        <div className="flex-col bg-gradient-to-r from-cyan-600 to-purple-500 ... space ">
            <NavBar />
            <div className="">
                <h2 className="">{oneList.listName}</h2>
                {listItems.map((eachItem, indx) => {
                    return (
                        <ol>
                            <li>{eachItem.title}</li>
                        </ol>
                    )
                })}
            </div>
        </div>
    )
}

export default EditPage