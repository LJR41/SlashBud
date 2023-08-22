import { Carousel, Typography, Button } from "@material-tailwind/react";
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// howdy

export function CarouselWithContent() {
    const [games, setGames] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=5`)
            .then(resp => {
                console.log(resp.data)
                setGames(resp.data)
                console.log(games)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
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
                                games.map((eachGame)=> {
                                    return (
                            <div className="relative h-full w-full ">
                                <img
                                    src={eachGame.thumb}
                                    alt="pic 1"
                                    className="h-full w-full object-cover" />
                                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                                    <div className="w-3/4 text-center md:w-2/4">
                                        <Typography variant="h1" color="white" className="mb-4 text-3xl md:text-4xl lg:text-5xl">
                                            <p>{eachGame.title}</p>
                                        </Typography>
                                        <Typography variant="lead" color="white" className="mb-12 opacity-70">
                                            It is not so much for its beauty that the forest makes a claim
                                            upon men&apos;s hearts, as for that subtle something, that quality
                                            of air that emanation from old trees, that so wonderfully changes
                                            and renews a weary spirit.
                                        </Typography>
                                        <div className="flex justify-center gap-2">
                                            <Button size="lg" color="white" >
                                                View Selected
                                            </Button>
                                            <Button size="lg" color="white" variant="text">
                                                View All
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div> :
                    <p>Loading...</p>
            }
        </div>
    );
}