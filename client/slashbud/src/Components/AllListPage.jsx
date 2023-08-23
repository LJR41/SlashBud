import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AllListPage = () => {
    const [characters, setCharacters] = useState("")
    const [games, setGames] = useState("")
    const [isFavorite, setIsFavorites] = useState(false)
    const [isPublic, setIsPublic] = useState(false)
    const [isPrivate, setIsPrivate] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/lists`,
        {characters, games, isFavorite, isPublic, isPrivate})

        .then(response =>{
            navigate ('/alllists')
        })
        .catch(err => console.log(err))
    }


  return (
    <div>
    <h4>WHATEVER TITLE WILL BE</h4>
    <form onSubmit={handleSubmit}>
        <div>
            <label>Characters</label>
            <input type="text" name="characters" value={characters} onChange={e => setCharacters(e.target.value)} />
        </div>
        <div>
            <label>Games</label>
            <input type="text" name="games" value={games} onChange={e => setGames(e.target.value)} />
        </div>
        <div>
            <label>Display as Favorite</label>
            <input type='checkbox' checked={isFavorite} onChange={e=>setIsFavorites(e.target.checked)}></input>
        </div>
        <div>
            <label>Set as Public</label>
            <input type='checkbox' checked={isPublic} onChange={e=>setIsPublic(e.target.checked)}></input>
        </div>
        <div>
            <label>Set as Private</label>
            <input type='checkbox' checked={isPrivate} onChange={e=>setIsPrivate(e.target.checked)}></input>
        </div>
        <button type="submit">Submit</button>
    </form>
</div>
  )
}

export default AllListPage