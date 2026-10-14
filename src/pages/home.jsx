import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4 bg-gray-50 p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900">IvoTronix Store</h1>
      <p className="text-gray-600">Bienvenido a la tienda gamer.</p>

      <Link to="/items">
        <button className="rounded-2xl bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
          Ver Catálogo
        </button>
      </Link>

      <Link to="/favoritos">
        <button className="rounded-2xl bg-gray-800 px-4 py-2 text-white hover:bg-gray-900">
          Ver Favoritos
        </button>
      </Link>
    </div>
  )
}