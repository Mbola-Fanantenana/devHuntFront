import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <Link to={'/login'} className='bg-gradient-to-tl from-purple-700 rounded to-blue-800 text-white py-2 px-4'>Se connecter</Link>
      </div>
    </>
  )
}

export default App
