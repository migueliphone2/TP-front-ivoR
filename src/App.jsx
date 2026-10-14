import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Catalog from './pages/catalogo'
import CategoryList from './pages/categorylist'
import ItemDetail from './pages/detalles'
import Favorites from './pages/favoritos'
import NotFound from './pages/notfound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace/>} />

      <Route path="/home" element={<Home />} />

      <Route path="/items" element={<Catalog />}>
        <Route path="categoria/:categoria" element={<CategoryList />} />
      </Route>

      <Route path="/item/:id" element={<ItemDetail />} />

      <Route path="/favoritos" element={<Favorites />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}