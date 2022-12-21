import './App.css'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <div className='text-[30px] text-red-500'>{routeElements}</div>
    </>
  )
}

export default App
