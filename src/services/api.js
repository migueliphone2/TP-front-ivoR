const api_url = 'https://dummyjson.com'  

export const categorias_validas = ['laptops', 'smartphones', 'tablets', 'mobile-accessories']

export async function obtenerProductosPorCategoria(categoria) {
  const respuesta = await fetch(api_url + '/products/category/' + categoria) 

  if (respuesta.ok === false) {
    throw new Error('No se pudo obtener la categoría: ' + categoria)
  }

  const datos = await respuesta.json()

  return datos.products 
}

export async function obtenerProductoPorId(id) {
  const respuesta = await fetch(api_url + '/products/' + id) 

  if (respuesta.ok === false) {
    throw new Error('Producto no encontrado')
  }

  const producto = await respuesta.json()
  return producto
}

export async function obtenerTodosLosProductosGamer() { 
  let todosLosProductos = []

  for (let i = 0; i < categorias_validas.length; i++) { 
    const categoria = categorias_validas[i]
    const productosDeEstaCategoria = await obtenerProductosPorCategoria(categoria) 

    todosLosProductos = todosLosProductos.concat(productosDeEstaCategoria) 

  return todosLosProductos
}
}