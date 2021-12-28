import { useState, useEffect } from 'react';
import { api } from "./services";


function App() {

  const [pokemons, setPokemons] = useState([]);
  const [prev, setPrev] = useState([null]);
  const [next, setNext] = useState([null]);

  useEffect(() => { 
  
    api.get("pokemon")
      .then((res) => {
        setPokemons(res.data.results);
        console.log(res.data)
        setPrev(res.data.previous);
        setNext(res.data.next);
      })
      .catch((err) => console.log(err));

  }, []);

  const seePrev = () => {
    api.get(prev).then(res => {
      setPokemons(res.data.results);
      setPrev(res.data.previous);
      setNext(res.data.next);
    })
  }

  const seeNext = () => {
     api.get(next).then(res => {
      setPokemons(res.data.results);
      setPrev(res.data.previous);
      setNext(res.data.next);
    })
  }

  // const buildImgUrl = (url) => {
  //   const id = url.split("/");
  //   const idx = id.length - 2;
  //   const imgUrl = `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${id[idx]}.png`
  
  //   return imgUrl;
  // };
  

  return (
    <div className="container">
      <div className="pokemon-container">
        <div>
          {
            pokemons.map((pokemon) => (
              <div key={pokemon.name} className='pokemon'>
              <img src={ pokemon.sprites } alt={ pokemon.name }/>
                <p>{ pokemon.name }</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className="buttons-container">
        <button onClick={() => seePrev()}>Ver Anteriores</button>
        <button onClick={() => seeNext()}>Ver Próximos</button>
      </div>
  </div>
  );
}

export default App;
