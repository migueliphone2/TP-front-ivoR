import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-50 p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900">404</h1>
      <p className="text-gray-600">Página no encontrada.</p>

      <button
        onClick={function () {
          navigate(-1)
        }}
        className="rounded-2xl bg-orange-500 px-3 py-1 text-sm text-white hover:bg-orange-600"
      >
        ← Volver
      </button>
    </div>
  )
}