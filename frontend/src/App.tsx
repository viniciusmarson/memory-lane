import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import AuthedLayout from './layouts/AuthedLayout'
import { MemoriesPage } from './pages/memories'
import NewMemory from './pages/NewMemory'
import EditMemory from './pages/EditMemory'
import { AlertProvider } from './contexts/alert'

function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthedLayout />}>
            <Route index element={<MemoriesPage />} />
            <Route path='/new-memory' element={<NewMemory />} />
            <Route path='/edit-memory/:id' element={<EditMemory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  )
}

export default App
