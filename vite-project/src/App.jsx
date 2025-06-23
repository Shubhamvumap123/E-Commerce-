import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-2xl font-bold text-blue-600 p-4 bg-gray-100 rounded shadow">
        Hello
      </div>
    </>
  )
}

export default App
