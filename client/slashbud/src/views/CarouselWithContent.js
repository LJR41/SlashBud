import { Carousel, Typography, Button } from "@material-tailwind/react";
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export function CarouselWithContent() {
    const [games, setGames] = useState([])
    const [oneGame, setOneGame] = useState()
    const [summaries, setSummaries] = useState([])

    useEffect(() => {
        apiCall()
    }, [])

    const apiCall = async () => {
        try{
        const resp = await axios.get(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=5`)
        console.log(resp.data)
        setGames(resp.data)
        console.log(games)
        setOneGame(resp.data[0].title)
        const gamesList = resp.data
        console.log(gamesList)
        let summaryList = []
        for (const game of gamesList) {
            console.log(game)
            const gameData = await axios.post('http://localhost:8000/api/search/summary', { oneGame: game.title })
            console.log(gameData)
            summaryList.push(gameData.data[0].summary)
        }
        setSummaries(summaryList)
    }
    catch(err){
        console.log(err)
    }
    }

    return (
        <div>
            <div className="m-4">
            <Typography variant="h1" color="lime" className="mb-4 text-3xl md:text-4xl lg:text-4xl">
                Games On Sale Today $15 Or Less
            </Typography>
            </div>
            {
                games ?
                    <div>
                        <Carousel
                            className="rounded-xl hide "
                            navigation={({ setActiveIndex, activeIndex, length }) => (
                                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                    {new Array(length).fill("").map((_, i) => (
                                        <span
                                            key={i}
                                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                                }`}
                                            onClick={() => setActiveIndex(i)}
                                        />
                                    ))}
                                </div>
                            )}
                        >
                            {
                                games.map((eachGame, index) => {
                                    return (
                                        <div className="relative h-full w-full ">
                                            <img
                                                src={eachGame.thumb}
                                                alt="pic 1"
                                                className="h-full w-full object-cover pic" />
                                            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                                                <div className="w-3/4 text-center md:w-4/4">
                                                    <Typography variant="h1" color="white" className="mb-4 text-3xl md:text-4xl lg:text-5xl">
                                                        <p>{eachGame.title}</p>
                                                    </Typography>
                                                    <Typography variant="lead" color="white" className="mb-12 opacity-70 size">
                                                        <p>{summaries[index]}</p>
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                        <div className="flex justify-center gap-2 mb-8">
                            <Button  size="lg" color="white"  >
                                View Selected
                            </Button>
                            <Button size="lg" color="white" variant="text">
                                View All Games
                            </Button>
                        </div>
                    </div> :
                    <p>Loading...</p>
            }
        </div>
    );
}