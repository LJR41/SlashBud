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
            { characters, games, isFavorite, isPublic, isPrivate })

            .then(response => {
                navigate('/alllists')
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="container mx-auto p-4">
            <h4 className="text-xl font-bold mb-4">WHATEVER TITLE WILL BE</h4>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-600">Characters</label>
                    <input
                        type="text"
                        name="characters"
                        value={characters}
                        onChange={(e) => setCharacters(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Games</label>
                    <input
                        type="text"
                        name="games"
                        value={games}
                        onChange={(e) => setGames(e.target.value)}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Display as Favorite</label>
                    <input
                        type="radio"
                        checked={isFavorite}
                        onChange={(e) => setIsFavorites(e.target.checked)}
                        className="mr-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Set as Public</label>
                    <input
                        type="radio"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="mr-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Set as Private</label>
                    <input
                        type="radio"
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                        className="mr-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>

            <div className="mt-4">All Lists</div>
        </div>
    )
}

export default AllListPage