import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from './NavBar'

const GameSearch = () => {
    const [allGames, setAllGames] = useState()
    const [allGenres, setAllGenres] = useState()
    const [allPlatforms, setAllPlatforms] = useState()
    const [gameSearch, setGameSearch] = useState()
    const [foundGame, setFoundGame] = useState()
    const [allLists, setAllLists] = useState()
    const [userData, setUserData] = useState()
    const [saleSearch, setSaleSearch] = useState()
    const [foundSale, setFoundSale] = useState()
    // const [bigData, setBigData] = useState({
    //     gameName:[""],
    //     gameRating: [0],
    //     gameImage: [""]
    // })

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
        const getUser = async () => {
            const res = await axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
            const response = await axios.get(`http://localhost:8000/api/lists/${res.data.user._id}`)
            setUserData(response.data._id)
            setAllLists(response.data.lists)
            // console.log(userData)
            // console.log(allLists)
        }



        getUser()
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

    const handleSales = (e) => {
        e.preventDefault()
        axios.get(`https://www.cheapshark.com/api/1.0/deals?storeID=1&title=${saleSearch}`)
            .then(response => {
                console.log(response.data)
                setFoundSale(response.data)
            })
            .catch(err => console.log(err))
    }

    const addToList = (listId, toBeAdded) => {
        console.log(listId, toBeAdded)
        axios.patch(`http://localhost:8000/api/list/${listId}`,{ title: toBeAdded})
        .then(response => {
            console.log(response)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className=" bg-gradient-to-r from-cyan-600 to-purple-500 ... space  tall ">
            <NavBar />
            {/* Search sales */}
            <div className="move ...ring-offset-4 ring-4 items-center justify-center max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className=" m-b-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Search For A Game :D</h5>
                <div>
                    <form onSubmit={handleSales}>
                        <input type="text" placeholder=" Type here..." className='rounded-lg text-center ring-offset-3 ring-2' value={saleSearch} onChange={e => { setSaleSearch(e.target.value) }} />
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
                                <th class="border border-slate-600 ...">On Sale</th>
                                <th class="border border-slate-600 ...">Sale Price</th>
                                <th class="border border-slate-600 ...">Normal Price</th>
                                <th class="border border-slate-600 ...">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="mb-12 size">
                            {foundSale ?
                                foundSale.map((eachSale, Idx) => {
                                    return (
                                        <tr>
                                            <td class="border border-slate-700 ..."> {eachSale.title}</td>
                                            <td class="border border-slate-700 ..."> {eachSale.steamRatingPercent}</td>
                                            <td class="border border-slate-700 ..." >{(eachSale.isOnSale == 1) ? "Yes": "No"}</td>
                                            <td class="border border-slate-700 ..." >{eachSale.salePrice}</td>
                                            <td class="border border-slate-700 ..." >{eachSale.normalPrice}</td>
                                            <td class="border border-slate-700 ..." >
                                                <select name="lists" id="">
                                                    <option hidden value="">Add to List</option>
                                                    {
                                                        allLists.map((eachList, idx) => {
                                                            return (
                                                                <option value="" onClick={() => { addToList(eachList._id,eachSale.title) }}>{eachList.listName}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                })
                                : <tr></tr>}</tbody>
                    </table>
                </div>
            </div>
            {/* Botttom Chart */}
            <div class=" slide  relative overflow-x-aut shadow-md sm:rounded-sm" >
                <table class="text-sm text-left text-gray-500 dark:text-gray-400 mb-10 ...ring-offset-4 ring-4">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Genre
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Platform(s)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allGames ?
                            allGames.map((eachGame, Idx) => {
                                return (
                                    <tr key={Idx} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 mb-10">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {eachGame.name}
                                        </th>
                                        <td class="px-6 py-4">
                                            {allGenres &&
                                                formatGenre(eachGame)
                                            }
                                        </td>
                                        <td class="px-6 py-4">
                                            {allPlatforms &&
                                                formatPlatforms(eachGame)}
                                        </td>
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