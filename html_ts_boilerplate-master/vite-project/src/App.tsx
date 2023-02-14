import Play from './Components/Play/Play'
import Home from '../src/Components/Home/Home'
import Statistics from '../src/Components/Statistics/Statistics'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import './App.css'

function App() {

  const client = new QueryClient() 


 
  return (
    <QueryClientProvider client={client}>
      <Router>
        <div className='navigation'>
          <div  className='link'><Link to="/">HOME</Link></div>
          <div  className='link'><Link to="/game">PLAY</Link></div>
          <div  className='link'><Link to="/statistics">STATISTICS</Link></div>
          </div>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/game" element={<Play />}/>
            <Route path="/statistics" element={<Statistics />}/>
          </Routes>
          
      </Router>
    </QueryClientProvider>
    
  )
}

export default App
