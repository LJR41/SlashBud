import './App.css';

import { Routes, Route} from 'react-router-dom';
import HomePage from './views/HomePage';
// import { CarouselWithContent } from './CarouselWithContent'

import APITest from './Components/APITest';


function App() {
  return (
    <div className="App">
      <p>First Merge Commit</p>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <APITest/>
    </div>
  );
}

export default App;
