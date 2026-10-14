import { useState, useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

const categorias_validas = ['laptops', 'smartphones', 'tablets', 'mobile-accessories']

export default function Catalog() {
  const navigate = useNavigate()

  // productos aleatorios para la sección de recomendados
  const [recomendados, setRecomendados] = useState([])
  const [cargandoRecomendados, setCargandoRecomendados] = useState(true)

  // posicion del primer producto visible en la sección de recomendados
  const [indiceInicio, setIndiceInicio] = useState(0)
  const cantidadVisible = 4

  useEffect(function () {
    async function cargarRecomendados() {
      try {
        setCargandoRecomendados(true)

        // elige un producto aleatorio para que la seccion de recomendaciones no tenga siempre los mismos productos.
        // Trae productos de la API entera, tengo pensado cambiarlo para que filtre solo productos de las categorias validas 
        const salteoAleatorio = Math.floor(Math.random() * 180)

        const respuesta = await fetch(
          'https://dummyjson.com/products?limit=10&skip=' + salteoAleatorio
        )

        const datos = await respuesta.json()
        setRecomendados(datos.products)
      } catch (err) {
        console.log('Error al traer recomendados:', err.message)
      } finally {
        setCargandoRecomendados(false)
      }
    }

    cargarRecomendados()
  }, []) // se ejecuta una sola vez cuando entra a la pagina

  function irAlAnterior() {
    if (indiceInicio > 0) {
      setIndiceInicio(indiceInicio - 1)
    }
  }

  function irAlSiguiente() {
    if (indiceInicio < recomendados.length - cantidadVisible) {
      setIndiceInicio(indiceInicio + 1)
    }
  }

  // recorta del array completo solo lo que entra en la ventana 
  const productosVisibles = recomendados.slice(indiceInicio, indiceInicio + cantidadVisible)

  return (
    <div className="flex flex-col items-center gap-4 bg-gray-50 p-8 min-h-screen">
      <button
        onClick={function () {
          navigate(-1)
        }}
        className="rounded-2xl bg-gray-800 px-3 py-1 text-sm text-white hover:bg-gray-900"
      >
        ← Volver
      </button>

      <h1 className="text-3xl font-bold text-gray-900">Catálogo</h1>

      <nav className="flex flex-wrap justify-center gap-3">
        {categorias_validas.map(function (categoria) {
          return (
            <Link key={categoria} to={'/items/categoria/' + categoria}>
              <button className="rounded-2xl bg-orange-500 px-3 py-1 text-sm text-white hover:bg-orange-600">
                {categoria}
              </button>
            </Link>
          )
        })}
      </nav>

      <Outlet />

      <div className="mt-6 w-full max-w-3xl">
        <h2 className="mb-3 text-xl font-bold text-gray-900">Productos recomendados</h2>

        {cargandoRecomendados ? (
          <p className="text-gray-600">Cargando recomendados...</p>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={irAlAnterior}
              className="rounded-2xl bg-gray-800 px-3 py-2 text-white hover:bg-gray-900"
            >
              ←
            </button>

            <div className="flex gap-4 overflow-hidden">
              {productosVisibles.map(function (producto) {
                return (
                  <div key={producto.id} className="w-40 rounded-2xl border border-gray-200 bg-white p-3">
                    <img src={producto.thumbnail} alt={producto.title} className="mb-2 w-full rounded-xl" />
                    <p className="text-sm font-semibold text-gray-900">{producto.title}</p>
                    <p className="text-sm text-gray-600">${producto.price}</p>
                  </div>
                )
              })}
            </div>

            <button
              onClick={irAlSiguiente}
              className="rounded-2xl bg-gray-800 px-3 py-2 text-white hover:bg-gray-900"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}