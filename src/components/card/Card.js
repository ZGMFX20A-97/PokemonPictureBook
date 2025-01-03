import "./card.css"

//ポケモンごとの展示カードコンポーネントの作成

function Card({ pokemon }) {
    return(
        <div className="card">
        <div className="cardImg">
            {/* pokemonのsprites属性のfront_default属性に入ったポケモン画像データのURLをsrcに与える */}
            <img src={pokemon.sprites.front_default} alt="ポケモンの画像"/>
        </div>
            <h3 className="cardName">{pokemon.name}</h3>
            <div className="cardType">
                <div>タイプ</div>
                {/* 複数属性を持つポケモンも存在するためmapメソッドで属性を抽出する */}
                {pokemon.types.map((type)=>{
                    return (
                        <div key={type.type.name} >
                            <span className="typeName">{type.type.name}</span>
                        </div>
                    )
                })}
            </div>
            <div className="cardinfo">
                <div className="cardData">
                    <p className="title">重さ：{pokemon.weight}</p>
                </div>
                <div className="cardData">
                    <p className="title">高さ：{pokemon.height}</p>
                </div>
                <div className="cardData">
                    <p className="title">アビリティ：{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
    </div>);
}

export default Card;