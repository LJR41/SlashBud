import './App.css';
import HomePage from './views/HomePage';
// import { CarouselWithContent } from './CarouselWithContent'

import APITest from './Components/GameSearch';
import { Routes, Route, Link } from 'react-router-dom';
import SignIn from './Components/SignIn';


function App() {
  return (
    <div className="App">
      <p>First Merge Commit</p>
      <Routes>
        <Route path="/" element={<HomePage />} />        
        <Route path='/register' element={<SignIn />} />
      </Routes>
      <APITest/>
    </div>
  );
}

export default App;
