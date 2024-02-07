import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './Header/Header'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Trips } from './pages/Trips/Trips'
import { Billing } from './pages/Billing/Billing'
import { Debugging } from './Debugging/Debugging'
import './App.css'

function AppWithAllProviders() {
  return (
    <div className="app">
      <Header />
      <Debugging />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </div>
  )
}

function Providers() {
  return (
    <BrowserRouter>
      <AppWithAllProviders />
    </BrowserRouter>
  )
}

export default Providers
