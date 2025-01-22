import GameBoard from './Game/GameBoard';
import { useEffect } from 'react';
import './App.css'

function App() {
  useEffect(() => {
    console.log('App component mounted')
  }, [])
  
  return (
    <div className="App">
      <GameBoard width={4} height={3} />

    </div>
  )
}

export default App
