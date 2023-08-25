import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Await } from 'react-router-dom'
import NavBar from './NavBar'


const CharacterSearch = () => {
  const [charSearch, setCharSearch] = useState()
  const [foundChar, setFoundChar] = useState()
  const [charMug, setCharMug] = useState()
  const [userData, setUserData] = useState()
  const [allLists, setAllLists] = useState()

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("http://localhost:8000/api/users/loggedin", { withCredentials: true })
      const response = await axios.get(`http://localhost:8000/api/lists/${res.data.user._id}`)
      setUserData(res.data.user._id)
      setAllLists(response.data.lists)

    }

    getUser()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(`http://localhost:8000/api/search/character`, { charSearch })
    const characterData = response.data
    setFoundChar(characterData)


    const charResponse = await axios.post(`http://localhost:8000/api/search/image`, { characterData })
    setCharMug(charResponse.data[0].url)
    console.log(charMug)


  }
  const addToList = (id) => {
    axios.patch(`http://localhost:8000/api/list/${id}`, { title: foundChar[0].name, imageURL: charMug })
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }
  return (
    <div>
      <div>
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
        {foundChar ?

          <div>
            <h1 className="mb-3 t">{foundChar[0].name}</h1>
            <img className="big" src={charMug} alt="" />
            <select name="lists" id="">
              <option hidden value="">Add to List</option>
              {
                allLists.map((eachList, idx) => {
                  return (
                    <option value="" onClick={() => { addToList(eachList._id) }}>{eachList.listName}</option>
                  )
                })
              }
            </select>
          </div>
          : <h1>Loading</h1>}
      </div>
    </div>

  )
}

export default CharacterSearch
