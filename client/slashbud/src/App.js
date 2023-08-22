import './App.css';
import { Routes, Route} from 'react-router-dom';
import HomePage from './views/HomePage';
// import { CarouselWithContent } from './CarouselWithContent'

function App() {
  return (
    <div className="App">
      <p>First Merge Commit</p>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
