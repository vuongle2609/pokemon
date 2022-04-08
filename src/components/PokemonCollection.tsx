import React from 'react'
import { Pokemon, Detail, PokemonDetail } from '../interface'
import PokemonList from './PokemonList'
import "./pokemon.css";

interface Props {
    pokemons: PokemonDetail[],
    viewDetail: Detail,
    setDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonCollection: React.FC<Props> = (props) => {
    const { pokemons, viewDetail, setDetail } = props

    const selectPokemon = (id: number) => {
        if (viewDetail.isOpended) return
        setDetail({
            id: id,
            isOpended: true
        })
    }

    return (
        <>
            <section className={viewDetail.isOpended ? "collection-container-active" : "collection-container"}>
                {viewDetail.isOpended ? (
                    <div className="overlay">

                    </div>
                ) : (
                    false
                )}
                {pokemons.map(pokemon => {
                    return (
                        <div onClick={() => selectPokemon(pokemon.id)}>
                            <PokemonList
                                viewDetail={viewDetail}
                                setDetail={setDetail}
                                key={pokemon.id}
                                name={pokemon.name}
                                id={pokemon.id}
                                abilities={pokemon.abilities}
                                image={pokemon.sprites.front_default}
                            />
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default PokemonCollection