import React, {useState, useEffect} from 'react'
import { CarouselWithContent } from './CarouselWithContent'
import axios from 'axios'//NEW
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate = useNavigate()

    const [loggedUser, setLoggedUser] = useState("")
    //NEW////////////
    useEffect(()=> {
        axios.get("http://localhost:8000/api/users/loggedin", {withCredentials:true})
        .then(res=> {
            console.log(res)
            setLoggedUser(res.data.user)
        })
        .catch(err=> {
            console.log(err)
        })
    }, [])

    const logout = (e) => {
        axios.get('http://localhost:8000/api/users/logout', {withCredentials:true})
        .then(res=> {
            console.log(res)
            navigate('/register')
        })
        .catch(err=> {
            console.log(err)
        })
    }
    //////////////////////////

    return (
        <div className="bg-gradient-to-r from-cyan-600 to-purple-500 ... space">
            <div>
                <h1>{loggedUser.lastName}</h1>
                <button onClick={logout}>Logout</button>
            </div>
            
            <CarouselWithContent />
        </div>
    )
}
export default HomePage