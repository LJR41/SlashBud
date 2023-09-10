import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import NavBar from './NavBar'

const OneList = () => {
    const { id } = useParams()
    const [oneList, setOneList] = useState([])
    const [listItems, setListItems] = useState([])
    const [searchedItems, setSearchedItems] = useState([])

    useEffect(() => {

        getListData()
    }, [listItems])

    const getListData = async () => {
        const response = await axios.get(`http://localhost:8000/api/lists/one/${id}`)

        const gameData = response.data.listObjects
        let saleList = []
        for (let i = 0; i < gameData.length; i++) {
            const searchData = await axios.get(`https://www.cheapshark.com/api/1.0/deals?storeID=1&title=${gameData[i].title}`)
            saleList.push({...searchData.data, id: gameData[i]._id})
        }
        setSearchedItems(saleList)
        setListItems(gameData)
        setOneList(response.data)
    }

    const redirectShop = (id) => {
        window.open(`http://store.steampowered.com/app/${id}/`)
    }

    const removeFromList = (toBeRemoved) => {
        axios.patch(`http://localhost:8000/api/list/${id}/remove`, { _id: toBeRemoved })
        .then(response => {
                            console.log(response)
                        })
                        .catch(err => console.log(err))
    }

    // http://localhost:3000/onelist/64e81fae66671b2cc5de73f8

    return (
        <div className="flex-col bg-gradient-to-r from-cyan-600 to-purple-500 ... space ">
            <NavBar />
            <div className="move ...ring-offset-4 ring-4 items-center justify-center max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700e">
                <h1 className="flex items-center justify-center ... bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700e">{oneList.listName}</h1>
                <table class="border-separate border-spacing-2 border border-slate-500 ...">
                    <thead>
                        <tr>
                            <th class="border border-slate-600 ...">Title</th>
                            <th class="border border-slate-600 ...">On Sale</th>
                            <th class="border border-slate-600 ...">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="mb-12 size">
                        {searchedItems ?
                            searchedItems.map((eachSale, Idx) => {
                                return (
                                    <tr>
                                        <td class="border border-slate-700 ..."> {eachSale[0].title}</td>
                                        <td class="border border-slate-700 ..." >{(eachSale[0].isOnSale == 1) ? "Yes" : "No"}</td>
                                        <td class="border border-slate-700 ..." >
                                            <button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={() => { redirectShop(eachSale[0].steamAppID) }}>Shop</button>
                                            <button class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => { removeFromList(eachSale.id) }}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            : <tr></tr>}</tbody>
                </table>
            </div>

            {/* <div>
                <h3>{oneList.lists[0].listObjects[0]}</h3>
                <img src={oneList.listObjects[0].img}></img>
                {oneList.lists[0].isGames?<p>{oneList.listObjects[0].genre}</p>:<p>{oneList.listObjects[0].game}</p>}
            </div>
            <div>
                <p>{oneList.lists[0].isPublic?"Yes":"No"}</p>
                <p>Last Updated: {oneList.lists[0].updatedAt}</p>
                <p>First Created: {oneList.lists[0].createdAt}</p>
                <button type='button'>UPDATE BUTTON NEEDS WORK</button>
                <button type='button'>DELETE BUTTON NEEDS WORK</button>
            </div> */}
        </div>
    )
}

export default OneList