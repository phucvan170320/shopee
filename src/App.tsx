import './App.css'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <div className=''>
        {routeElements}
        <ToastContainer />
      </div>
    </>
  )
}

export default App
