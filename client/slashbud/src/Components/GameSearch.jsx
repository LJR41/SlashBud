import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'

const GameSearch = () => {
    const [allGames, setAllGames] = useState()
    const [allGenres, setAllGenres] = useState()
    const [allPlatforms, setAllPlatforms] = useState()
    const [gameSearch, setGameSearch] = useState()
    const [foundGame, setFoundGame] = useState()

    useEffect(() => {
        axios.post(`http://localhost:8000/api/games`)
            .then(response => {
                setAllGames(response.data)
                // setOneGame(response.data.name)
            })
            .catch(err => console.log(JSON.stringify(err)))

        axios.post(`http://localhost:8000/api/genres`)
            .then(response => {
                const genreList = response.data

                const genreObject = {}
                for (const genre of genreList) {
                    genreObject[genre["id"]] = genre['name']
                }
                setAllGenres(genreObject)
            })
            .catch(err => console.log(JSON.stringify(err)))

        axios.post(`http://localhost:8000/api/platforms`)
            .then(response => {
                const platformsList = response.data

                const platformsObject = {}
                for (const platforms of platformsList) {
                    platformsObject[platforms["id"]] = platforms['name']
                }
                setAllPlatforms(platformsObject)
            })
            .catch(err => console.log(JSON.stringify(err)))
    }, [])

    const formatGenre = (gameObject) => {
        if (!gameObject.hasOwnProperty('genres')) {
            return "N/A"
        }
        else {
            let output = ""
            for (let i = 0; i < gameObject.genres.length; i++) {
                output += allGenres[gameObject.genres[i]]
                if (i !== gameObject.genres.length - 1) {
                    output += ", "
                }
            }
            return output
        }
    }
    const formatPlatforms = (platformsObject) => {
        if (!platformsObject.hasOwnProperty('platforms')) {
            return "N/A"
        }
        else {
            let output = ""
            for (let i = 0; i < platformsObject.platforms.length; i++) {
                output += allPlatforms[platformsObject.platforms[i]]
                if (i !== platformsObject.platforms.length - 1) {
                    output += ", "
                }
            }
            return output
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/search/game`, { gameSearch })
            .then(response => {
                console.log(response.data)
                setFoundGame(response.data)
            })
            .catch(err => console.log(err))
    }


    return (
   
        <div className="flex-col bg-gradient-to-r from-cyan-600 to-purple-500 ... space ">
          <NavBar />
            <div className="move ...ring-offset-2 ring-4 items-center justify-center max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className=" m-b-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Search For A Game :D</h5>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder=" Type here..." className='rounded-lg text-center ring-offset-3 ring-2' value={gameSearch} onChange={e => { setGameSearch(e.target.value) }} />
                        <select name="genre " id="genre" className='rounded-lg m-1'>
                            <option hidden>Genre</option>
                            <option value="FPS">FPS</option>
                            <option value="Horror">Horror</option>
                            <option value="Action">Action</option>
                            <option value="Simulation">Simulation</option>
                        </select>
                        <select name="platform" id="platform" className='rounded-lg m-1'>
                            <option hidden>Platform</option>
                            <option value="PC">PC</option>
                            <option value="Playstation">Playstation</option>
                            <option value="Xbox">Xbox</option>
                            <option value="Switch">Switch</option>
                        </select>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-.5 px-2 rounded-full m-1">Search</button>
                    </form>
                </div>
                <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <table class="border-separate border-spacing-2 border border-slate-500 ...">
                        <thead>
                            <tr>
                                <th class="border border-slate-600 ...">Title</th>
                                <th class="border border-slate-600 ...">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="mb-12 size">
                            {foundGame ?
                                foundGame.map((eachGame, Idx) => {
                                    return (
                                        <tr>
                                            <td class="border border-slate-700 ..."> {eachGame.name}</td>
                                            <td class="border border-slate-700 ..." >{eachGame.rating ? Math.round(eachGame.rating) : "N/A"}</td>
                                        </tr>
                                    )
                                })
                                : <tr></tr>}</tbody>
                    </table>
                </div> 
          </div>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                <table >
                    <thead>
                        <tr>
                            <th>
                                Title
                            </th>
                            <th>
                                Genre
                            </th>
                            <th>
                                Platform(s)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allGames ?
                                allGames.map((eachGame, Idx) => {
                                    return (
                                        <tr key={Idx}>
                                            <td>{eachGame.name}</td>
                                            <td>{allGenres &&
                                                formatGenre(eachGame)
                                            }</td>
                                            <td>{
                                                allPlatforms &&
                                                formatPlatforms(eachGame)
                                            }</td>
                                        </tr>
                                    )
                                })
                                : <tr>
                                    <td>Loading...</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default GameSearch