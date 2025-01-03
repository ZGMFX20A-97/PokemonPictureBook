import './App.css';
import {useEffect, useState} from "react";
import {getAllPokemon, getPokemon} from "./utils/pokemon";
import Card from "./components/card/Card";
import {Navbar} from "./components/navbar/Navbar";

function App() {
  //公式が指定したAPIエンドポイント
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  //データ取得中のloading状態
  const [loading, setLoading] = useState(true);
  //各々のポケモンの詳細データ
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");


  const loadPokemon = async (data) => {

        let _pokemonData = await Promise.all(

            data.map(pokemon => {
                return getPokemon(pokemon.url);
            })

        );
        setPokemonData(_pokemonData);
    };


  useEffect(() => {
    const fetchPokemonData = async () => {
      //APIエンドポイントからデータ得お取得
      let data = await getAllPokemon(initialURL);
      //ポケモンデータを取得
      await loadPokemon(data.results);
      //次ページのポケモンデータのURLをセットする
      setNextURL(data.next);
      //前ページのポケモンデータのURLをセットする
      setPrevURL(data.previous);
      //取得後はloading状態をfalseにする
      setLoading(false);
    };
    fetchPokemonData();
  },[])

async function handleNextPage() {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
}
async function handlePrevPage(){
  //１ページ目は前ページのURLが存在しないため何もしない
    if(!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
}

  return (
      <>
      <Navbar />
    <div className="App">
      {loading ? (
          <h1>ロード中...</h1>
      ):(
          <>
          <div className="pokemonCardContainer">
              {pokemonData.map((pokemon,index) => {
                  return <Card key={index} pokemon={pokemon}/>;
              })}
          </div>
              <div className="btn">
                  <button onClick={handlePrevPage}>前へ</button>
                  <button onClick={handleNextPage}>次へ</button>
              </div>
          </>
      )}
    </div>
      </>
  );
}

export default App;
