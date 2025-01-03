export const getAllPokemon = (url) => {

    return new Promise((resolve,reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => resolve(data));
    })

}

//詳細のポケモンデータを取得するための関数
export const getPokemon=(url) => {
    return new Promise((resolve,reject)=>{
        fetch(url)
            .then(res => res.json())
            .then(data => resolve(data));
    })

}