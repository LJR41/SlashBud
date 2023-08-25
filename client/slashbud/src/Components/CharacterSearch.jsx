import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Await } from 'react-router-dom'
import NavBar from './NavBar'

const CharacterSearch = () => {
  const [charSearch, setCharSearch] = useState()
  const [foundChar, setFoundChar] = useState()
  const [charMug, setCharMug] = useState()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(`http://localhost:8000/api/search/character`, { charSearch })
    const characterData = response.data
    setFoundChar(characterData)


    const charResponse = await axios.post(`http://localhost:8000/api/search/image`, { characterData })
    setCharMug(charResponse.data[0].url)
    console.log(charMug)
  }
  return (

    <div><div>
      <NavBar/>
      <div className="flex-col bg-gradient-to-r from-cyan-600 to-purple-500 ... space ">
        <div className="move ...ring-offset-4 ring-4 items-center justify-center max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className=" m-b-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Search For A Character </h5>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder=" Type here..." className='rounded-lg text-center ring-offset-3 ring-2' value={charSearch} onChange={e => { setCharSearch(e.target.value) }} />
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
          <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            {foundChar ?
              <div>
                <h1 className="mb-3 t">{foundChar[0].name}</h1>
                <img className="big" src={charMug} alt="" />
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-.5 px-2 rounded-full m-1">Add to List</button>
              </div>
              : <h1>Loading</h1>}
          </div>
        </div>    
      </div>
    </div>
    </div>
  )
}

export default CharacterSearch
