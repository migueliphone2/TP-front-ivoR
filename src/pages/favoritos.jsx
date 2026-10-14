import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function Favorites() {
  const navigate = useNavigate()
  const { favoritos, agregarOQuitarFavorito } = useFavorites()

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <div className="mb-4 flex flex-col items-center gap-4">
        <button
          onClick={function () {
            navigate(-1)
          }}
          className="rounded-2xl bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-900"
        >
          ← Volver
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Favoritos</h1>
      </div>

      {favoritos.length === 0 ? (
        <p className="text-center text-gray-600">Todavía no agregaste ningún favorito.</p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-6">
          {favoritos.map(function (producto) {
            return (
              <li key={producto.id} className="w-48 rounded-2xl border border-gray-200 bg-white p-4">
                <img src={producto.thumbnail} alt={producto.title} className="mb-2 w-full rounded-xl" />
                <p className="font-semibold text-gray-900">{producto.title}</p>
                <p className="mb-2 text-gray-600">${producto.price}</p>

                <button
                  onClick={function () {
                    agregarOQuitarFavorito(producto)
                  }}
                  className="w-full rounded-2xl bg-orange-500 px-3 py-1 text-sm text-white hover:bg-orange-600"
                >
                  Quitar de favoritos
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}