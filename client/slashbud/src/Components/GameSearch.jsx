import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const APITest = () => {
    const [allGames, setAllGames] = useState()
    const [allGenres, setAllGenres] = useState()
    const [allPlatforms, setAllPlatforms] = useState()

    useEffect(() => {
        axios.post(`http://localhost:8000/api/games`)
            .then(response => {
                setAllGames(response.data)
            })
            .catch(err => console.log(JSON.stringify(err)))
            
        axios.post(`http://localhost:8000/api/genres`)
            .then(response => {
                const genreList = response.data

                const genreObject = {}
                for(const genre of genreList){
                    genreObject[genre["id"]] = genre['name']
                }
                setAllGenres(genreObject)
            })
            .catch(err => console.log(JSON.stringify(err)))

        axios.post(`http://localhost:8000/api/platforms`)
            .then(response => {
                const platformsList = response.data

                const platformsObject = {}
                for(const platforms of platformsList){
                    platformsObject[platforms["id"]] = platforms['name']
                }
                setAllPlatforms(platformsObject)
            })
            .catch(err => console.log(JSON.stringify(err)))
    }, [])

    const formatGenre = (gameObject) =>{
        if(!gameObject.hasOwnProperty('genres')){
            return "N/A"
        }
        else {
            let output = ""
            for (let i = 0; i < gameObject.genres.length; i++){
                output += allGenres[gameObject.genres[i]]
                if(i !== gameObject.genres.length-1){
                    output += ", "
                }
            }
            return output
        }
    }
    const formatPlatforms = (platformsObject) =>{
        if(!platformsObject.hasOwnProperty('platforms')){
            return "N/A"
        }
        else {
            let output = ""
            for (let i = 0; i < platformsObject.platforms.length; i++){
                output += allPlatforms[platformsObject.platforms[i]]
                if(i !== platformsObject.platforms.length-1){
                    output += ", "
                }
            }
            return output
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("Submitted")
    }
    return (
        <div>
            <div style={{ display: 'inline-flex', alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                <form onSubmit={handleSubmit}>
                    <button type="submit">Search</button>
                    <input type="text" placeholder="Type here..." />
                    <select name="genre" id="genre">
                        <option hidden>Genre</option>
                        <option value="FPS">FPS</option>
                        <option value="Horror">Horror</option>
                        <option value="Action">Action</option>
                        <option value="Simulation">Simulation</option>
                    </select>
                    <select name="platform" id="platform">
                        <option hidden>Platform</option>
                        <option value="PC">PC</option>
                        <option value="Playstation">Playstation</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Switch">Switch</option>
                    </select>
                </form>

            </div>
            <div>
                <h1>Title Goes Here</h1>

            </div>
            <div style={{ display: 'inline-flex', alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>

                <table>
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
                                            <td>{ allGenres &&
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
        </div>
    )
}

export default APITest