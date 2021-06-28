import React, {useEffect, useState} from 'react'
import {fetchPokemon} from '../hooks/fetchPokemon'
import {PokemonDataView} from './PokemonDataView'
import {PokemonInfoFallback} from './PokemonInfoFallback'

export function PokemonInfo({pokemonName}) {
  const [state, setState] = useState({
    status: pokemonName ? 'pending' : 'idle', // there was a little refresh when already have a pokemon loaded, if we will make a new petition that pokemon refresh the component
    pokemon: null,
    error: null,
  })

  const {pokemon, error, status} = state // the destructuration, I could have done it directly at useState, but I think to see better this way

  useEffect(() => {
    if (!pokemonName) {
      return
    }

    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({status: 'resolved', pokemon})
      },
      error => {
        setState({status: 'rejected', error})
      },
    )
  }, [pokemonName])

  // there is a most logic about the show the user, so implemented a state for handle our components
  if (status === 'idle') {
    return 'Submit a pokemon' // when it load to first screen,  there isn't pokemon, so to show this message
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} /> //when the request is being made, it shower theimg load
  } else if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} /> // return the pokemon with its information
  }
}
