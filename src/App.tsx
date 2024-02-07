import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Header } from './Header/Header'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Trips } from './pages/Trips/Trips'
import { Billing } from './pages/Billing/Billing'
import { Debugging } from './Debugging/Debugging'
import './App.css'
import { AppContextProvider } from './contexts/app/AppContext'

function PageLayout() {
  return (
    <>
      <Header />
      <Debugging />
      <Outlet />
    </>
  )
}

function ActualRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="trips" element={<Trips />} />
      <Route path="billing" element={<Billing />} />

      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/company/:companyId/*" element={<ActualRoutes />} />
        <Route path="*" element={<ActualRoutes />} />
      </Route>
    </Routes>
  )
}

function AppWithAllProviders() {
  return (
    <div className="app">
      <AppRoutes />
    </div>
  )
}

function Providers() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <AppWithAllProviders />
      </AppContextProvider>
    </BrowserRouter>
  )
}

export default Providers
