import './App.css';
import TriviaGame from './TriviaGame';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './screens/StartScreen';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<StartScreen/>}/>
      <Route path="/game" element={<TriviaGame />}/>
      </Routes>

    </Router>
  );
}

export default App;
