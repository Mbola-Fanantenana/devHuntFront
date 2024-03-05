import { Link } from 'react-router-dom'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <>
      <div className='flex items-center justify-center h-screen'>
      <Chatbot />
        <Link to={'/login'} className='px-4 py-2 text-white rounded bg-gradient-to-tl from-purple-700 to-blue-800'>Se connecter</Link>
      </div>
    </>
  )
}

export default App
