import React, {useEffect, useState} from 'react'
import {fetchPokemon} from '../hooks/fetchPokemon'
import {PokemonDataView} from './PokemonDataView'
import {PokemonInfoFallback} from './PokemonInfoFallback'
export function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!pokemonName) {
      return
    }
    setPokemon(null) // when te state change, setPokemon will again null for load the new pokemon
    setError(null) // when te state change, setError will again null for load the new pokemon
    fetchPokemon(pokemonName).then(
      pokemon => setPokemon(pokemon),
      error => setError(error),
    )
  }, [pokemonName])
  if (error) {
    // this validation will executed when the name pokemon not exit
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (!pokemonName) {
    return 'Submit a pokemon' // when it load to first screen,  there isn't pokemon, so to show this message
  } else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} /> //when the request is being made, it shower theimg load
  } else {
    return <PokemonDataView pokemon={pokemon} /> // return the pokemon with its information
  }
}
