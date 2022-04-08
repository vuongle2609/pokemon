import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PokemonCollection from './components/PokemonCollection'
import { Pokemon, Detail } from './interface'

interface Pokemons {
  name: string,
  url: string
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpended: false
  })

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20')
      setNextUrl(res.data.next)
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemons(prev => [...prev, poke.data])
        setLoading(false)
      })
    }

    fetchPokemons()
  }, [])

  const nextPage = async () => {
    setLoading(true)
    let res = await axios.get(nextUrl)
    setNextUrl(res.data.next)
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      setPokemons(prev => [...prev, poke.data])
      setLoading(false)
    })
  }

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">
          Pokemon Typescript
        </header>
        <PokemonCollection pokemons={pokemons} viewDetail={viewDetail} setDetail={setDetail} />
        {!viewDetail.isOpended ?
          (<div className="btn">
            <button onClick={nextPage}>{loading ? "loading..." : "load more"}</button>
          </div>)
          : false}
      </div>
    </div>
  )
}

export default App
