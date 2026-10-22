import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext()

 export function FavoritesProvider(props) {     
  const [favoritos, setFavoritos] = useState([])
  
  function esFavorito(idProducto) { 
    for (let i = 0; i < favoritos.length; i++) {
      if (favoritos[i].id === idProducto) {
        return true
      }
    }
    return false
  }

  function agregarOQuitarFavorito(producto) { 
    if (esFavorito(producto.id)) {
      const nuevaLista = favoritos.filter(function (item) {
        return item.id !== producto.id
      })
      setFavoritos(nuevaLista)
    } else {
      setFavoritos([...favoritos, producto])
    }
  }

  const valorDelContexto = { 
    favoritos: favoritos,
    esFavorito: esFavorito,
    agregarOQuitarFavorito: agregarOQuitarFavorito,
  }

  return ( 
    <FavoritesContext.Provider value={valorDelContexto}>
      {props.children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() { 
  return useContext(FavoritesContext)
}