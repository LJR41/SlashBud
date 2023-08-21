import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const APITest = () => {
    const getAPI = () => {
        axios.get (`http://localhost:8000/api/test`)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    return (
        <div>
            <button type="button" onClick={getAPI}>Submit</button>
        </div>
    )
}

export default APITest