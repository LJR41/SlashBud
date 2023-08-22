import './App.css';

import { Routes, Route} from 'react-router-dom';
import HomePage from './views/HomePage';
// import { CarouselWithContent } from './CarouselWithContent'

import APITest from './Components/APITest';
import { Routes, Route, Link } from 'react-router-dom';
import SignIn from './Components/SignIn';


function App() {
  return (
    <div className="App">
      <p>First Merge Commit</p>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <APITest/>
      <Routes>
        <Route path='/register' element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
