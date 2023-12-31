import React, {useState, useEffect} from 'react'
import { CarouselWithContent } from './CarouselWithContent'
import axios from 'axios'//NEW
import { useNavigate } from 'react-router-dom'
import NavBar from '../Components/NavBar'

const HomePage = () => {

    return (
        <div className="bg-gradient-to-r from-cyan-600 to-purple-500 ... space tall">
            <NavBar />
            <CarouselWithContent />
        </div>
    )
}
export default HomePage