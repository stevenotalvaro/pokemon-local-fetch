import React, {useEffect, useState} from 'react'
import {fetchPokemon} from '../hooks/fetchPokemon'
import {PokemonDataView} from './PokemonDataView'
import {PokemonInfoFallback} from './PokemonInfoFallback'
export function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    if (!pokemonName) {
      return
    }
    setPokemon(null)
    fetchPokemon(pokemonName).then(pokemon => {
      setPokemon(pokemon)
    })
  }, [pokemonName])

  if (!pokemonName) {
    return 'Submit a pokemon' // when it load to first screen,  there isn't pokemon, so to show this message
  } else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} /> //when the request is being made, it shower theimg load
  } else {
    return <PokemonDataView pokemon={pokemon} /> // return the pokemon with its information
  }
}
