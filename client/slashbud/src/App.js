import './App.css';
import HomePage from './views/HomePage';
// import { CarouselWithContent } from './CarouselWithContent'

import GameSearch from './Components/GameSearch';
import { Routes, Route, Link } from 'react-router-dom';
import SignIn from './Components/SignIn';
import EditPage from './Components/EditPage';
import AllListPage from './Components/AllListPage';
import CharacterSearch from './Components/CharacterSearch';


function App() {
  return (
    <div className="App">
      <p>First Merge Commit</p>
      <Routes>
        <Route path="/" element={<HomePage />} />        
        <Route path='/register' element={<SignIn />} />
        <Route path='/edit' element={<EditPage />} />
        <Route path='/alllist' element={<AllListPage />} />
        <Route path='/games' element={<GameSearch/>} />
        <Route path='/characters' element={<CharacterSearch/>}/>
      </Routes>

    </div>
  );
}

export default App;

