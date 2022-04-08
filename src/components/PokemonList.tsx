import React, { useState, useEffect } from 'react'
import "./pokemon.css";
import { Detail } from '../interface'

interface Props {
    viewDetail: Detail,
    setDetail: React.Dispatch<React.SetStateAction<Detail>>,
    name: string,
    id: number,
    abilities: {
        ability: string;
        name: string;
    }[] | undefined,
    image: string
}

const PokemonList: React.FC<Props> = (props) => {
    const { name, id, image, abilities, viewDetail, setDetail } = props
    const [isSelected, setSelected] = useState<boolean>(false)

    useEffect(() => {
        setSelected(id === viewDetail.id)
    }, [viewDetail])

    const closeDetail: () => void = () => {
        setDetail({
            id: 0,
            isOpended: false
        })
    }

    return (
        <div className="">
            {isSelected ? (
                <section className="pokemon-list-detailed">
                    <div className="detail-container">
                        <p className="detail-close" onClick={closeDetail}>
                            X
                        </p>
                        <div className="detail-info">
                            <img src={image} alt="pokemon" className="detail-img" />
                            <p className="detail-name">{name} </p>
                        </div>
                        <div className="detail-skill">
                            <p className="detail-ability">
                                Abilities:
                                {abilities?.map((ab: any) => {
                                    return (
                                        <div>{ab.ability.name}</div>
                                    )
                                })}
                            </p>
                        </div>
                    </div>
                </section>
            ) : (<section className="pokemon-list-container">
                <p className="pokemon-name">{name}</p>
                <img src={image} alt="pokemon" />

            </section>)}

        </div>
    )
}

export default PokemonList