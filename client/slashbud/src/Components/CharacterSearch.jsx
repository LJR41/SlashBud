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
    await axios.post(`http://localhost:8000/api/search/character`, { charSearch })
      .then(response => {
        setFoundChar(response.data)
      })
    if (foundChar) {
      axios.post(`http://localhost:8000/api/search/image`, { foundChar })
        .then(response => {
          setCharMug(response.data[0].url)
          console.log(charMug)
        })
        .catch(err => console.log(err))
    }
  }
  return (
    <div><div >
      <NavBar />
      <form onSubmit={handleSubmit}>
        <button type="submit">Search</button>
        <input type="text" placeholder="Type here..." value={charSearch} onChange={e => { setCharSearch(e.target.value) }} />
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
      <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        {foundChar? 

        <div>
          <h1>{foundChar[0].name}</h1>
          <img src={charMug} alt="" />
          <button>Add to List</button>
        </div>
        
        : <h1>Loading</h1>}

      </div>
    </div>
  )
}

export default CharacterSearch
