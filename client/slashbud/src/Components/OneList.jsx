import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"

const OneList = () => {
    const {id} = useParams()
    const [oneList, setOneList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/lists/${id}`)
        .then(response => setOneList(response.data))
        .catch(err => console.log(err))
    }, [])
    
    return (
        <div>
            <h2>{oneList.lists[0].listName}</h2>
            {oneList
                .sort((a,b) => a.lists[0].listObjects.localeCompare(b.name))
                .map((eachItem, indx) =>{
                return(
                    <ol>
                        <li>{oneList.lists[0].listObjects}</li>
                    </ol>
                )
            })}

            <div>
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
            </div>
        </div>
    )
}

export default OneList