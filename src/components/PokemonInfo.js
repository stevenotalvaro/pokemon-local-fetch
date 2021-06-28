import React, {useEffect, useState} from 'react'
import {fetchPokemon} from '../hooks/fetchPokemon'
import {PokemonDataView} from './PokemonDataView'
import {PokemonInfoFallback} from './PokemonInfoFallback'
export function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
  useEffect(() => {
    if (!pokemonName) {
      return
    }
    // setPokemon(null) // when te state change, setPokemon will again null for load the new pokemon
    // setError(null) // when te state change, setError will again null for load the new pokemon
    setStatus('rending')
    fetchPokemon(pokemonName).then(
      pokemon => {
        setPokemon(pokemon)
        setStatus('resolved')
      },
      error => {
        setError(error)
        setStatus('rejected')
      },
    )
  }, [pokemonName])

  // there is a most logic about the show the user, so implemented a state for handle our components
  if (status === 'idle') {
    return 'Submit a pokemon' // when it load to first screen,  there isn't pokemon, so to show this message
  } else if (status === 'rending') {
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

  // this was the as I had the logic implemented, without handle the status, I don't remove for think like it was
  //   if (error) {
  //     // this validation will executed when the name pokemon not exit
  //     return (
  //       <div role="alert">
  //         There was an error:{' '}
  //         <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
  //       </div>
  //     )
  //   } else if (!pokemonName) {
  //     return 'Submit a pokemon' // when it load to first screen,  there isn't pokemon, so to show this message
  //   } else if (!pokemon) {
  //     return <PokemonInfoFallback name={pokemonName} /> //when the request is being made, it shower theimg load
  //   } else {
  //     return <PokemonDataView pokemon={pokemon} /> // return the pokemon with its information
  //   }
}
