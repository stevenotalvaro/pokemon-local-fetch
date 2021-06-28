import React, {useEffect} from 'react'
import './styles.css'
export function PokemonForm({
  pokemonName: externalPokemonName,
  initialPokemonName = externalPokemonName || '',
  onSubmit,
}) {
  const [pokemonName, setPokemonName] = React.useState(initialPokemonName)

  // this is generally not a great idea. We're synchronizing state when it is
  // normally better to derive it https://kentcdodds.com/blog/dont-sync-state-derive-it
  // however, we're doing things this way to make it easier for the exercises
  // to not have to worry about the logic for this PokemonForm component.
  useEffect(() => {
    // note that because it's a string value, if the externalPokemonName
    // is the same as the one we're managing, this will not trigger a re-render
    if (typeof externalPokemonName === 'string') {
      setPokemonName(externalPokemonName)
    }
  }, [externalPokemonName])

  function handleChange(e) {
    setPokemonName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(pokemonName)
  }

  function handleSelect(newPokemonName) {
    setPokemonName(newPokemonName)
    onSubmit(newPokemonName)
  }

  return (
    <form onSubmit={handleSubmit} className="pokemon-form">
      <label htmlFor="pokemonName-input">Pokemon Name</label>
      <small>
        Try{' '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('pikachu')}
        >
          "pikachu"
        </button>
        {', '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('charizard')}
        >
          "charizard"
        </button>
        {', or '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('mew')}
        >
          "mew"
        </button>
      </small>
      <div>
        <input
          className="pokemonName-input"
          id="pokemonName-input"
          name="pokemonName"
          placeholder="Pokemon Name..."
          value={pokemonName}
          onChange={handleChange}
        />
        <button type="submit" disabled={!pokemonName.length}>
          Submit
        </button>
      </div>
    </form>
  )
}
