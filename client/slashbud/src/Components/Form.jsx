import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Form = () => {
    const [listName, setListName] = useState("")
    const [isCharacters, setIsCharacters] = useState(false)
    const [isGames, setIsGames] = useState(false)
    const [isFavorite, setIsFavorite] = useState(true)
    const [isPublic, setIsPublic] = useState(true)
    const [isPrivate, setIsPrivate] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/lists`,
            {listName, isCharacters, isGames, isFavorite, isPublic, isPrivate })

            .then(response => {
                console.log(listName, isCharacters, isGames, isFavorite, isPublic, isPrivate)
                navigate('/alllist')
            })
            .catch(err => console.log(err))
    }




    return (
        <div className="main_container ">

            {/* container for Create New List Form */}
            <div className="bg-gradient-to-r from-cyan-600 to-purple-500 ... space p-4">
                <h4 className="text-xl font-bold mb-4">Create a New List</h4>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div>
                        <label className="block text-white">List Name:</label>
                        <input
                            type='text'
                            name="listName"
                            className="border border-black"
                            value={listName}
                            onChange={e => setListName(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-white">Games</label>
                            <input
                                type="checkbox"
                                checked={isGames}
                                onChange={e => setIsGames(e.target.checked)}
                                className="mr-2" />
                        </div>
                        <div>
                            <label className="block text-white">Characters</label>
                            <input
                                type="checkbox"
                                checked={isCharacters}
                                onChange={e => setIsCharacters(e.target.checked)}
                                className="mr-2" />
                        </div>
                        <div>
                            <label className="block text-white">Set as Favorite</label>
                            <input
                                type="checkbox"
                                checked={isFavorite}
                                onChange={e => setIsFavorite(e.target.checked)}
                                className="mr-2" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-white">Set as Public</label>
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={e => setIsPublic(e.target.checked)}
                                className="mr-2" />
                        </div>
                        <div>
                            <label className="block text-white">Set as Private</label>
                            <input
                                type="checkbox"
                                checked={isPrivate}
                                onChange={e => setIsPrivate(e.target.checked)}
                                className="mr-2" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </form>

            </div>

        </div>




    )
}

export default Form