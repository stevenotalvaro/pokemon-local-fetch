import React, {useCallback, useEffect, useReducer} from 'react'
import {fetchPokemon} from '../hooks/fetchPokemon'
import {PokemonDataView} from './PokemonDataView'
import {PokemonInfoFallback} from './PokemonInfoFallback'

function pokemonInfoReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    }

    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null}
    }

    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error}
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function usePokemonAsyncReducer(asyncCallback, initialState) {
  const [state, dispatch] = useReducer(pokemonInfoReducer, {
    status: 'idle', // there was a little refresh when already have a pokemon loaded, if we will make a new petition that pokemon refresh the component
    data: null,
    error: null,
    ...initialState,
  })

  useEffect(() => {
    const promise = asyncCallback() // at our useEffect, it will call  the callback async, and if it have nothing, for example a pokemon, return nothing
    if (!promise) {
      return
    }

    dispatch({type: 'pending'}) // and if it have something, the first accion is 'pending' while load the information of pokemon
    promise.then(
      data => {
        dispatch({type: 'resolved', data}) // if the requets it's succecssful, return its informacion
      },
      error => {
        dispatch({type: 'rejected', error}) // otherwise, throw a error
      },
    )
  }, [asyncCallback])
  return state
}

export function PokemonInfo({pokemonName}) {
  const asyncCallback = useCallback(() => {
    // it implemented useCallback already that every time, it was called the pokemon name if this not change
    if (!pokemonName) {
      return
    }
    return fetchPokemon(pokemonName)
  }, [pokemonName])
  // The next block, I will handle asyncronico for to have un Custom Hook  (usePokemonAsyncReducer), when  first argument is the callback async
  // second argument is the initial state, with implementatio of useCallback, We don't have to send dependencies, because
  // be in the array de depencies from usecallback
  const state = usePokemonAsyncReducer(asyncCallback, {
    status: pokemonName ? 'pending' : 'idle',
  })

  const {data: pokemon, error, status} = state // the destructuration, I could have done it directly at useState, but I think to see better this way

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
