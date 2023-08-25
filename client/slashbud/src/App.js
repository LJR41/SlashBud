import './App.css';
import HomePage from './views/HomePage';
// import { CarouselWithContent } from './CarouselWithContent'

import GameSearch from './Components/GameSearch';
import { Routes, Route, Link } from 'react-router-dom';
import SignIn from './Components/SignIn';
import EditPage from './Components/EditPage';
import AllListPage from './Components/AllListPage';
import CharacterSearch from './Components/CharacterSearch';
import Form from './Components/Form';
import OneList from './Components/OneList';
import Profile from './Components/Profile';




function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />        
        <Route path='/register' element={<SignIn />} />
        <Route path='/edit' element={<EditPage />} />
        <Route path='/alllist/:id' element={<AllListPage />} />
        <Route path='/onelist/:id' element={< OneList/>} />
        <Route path='/games' element={<GameSearch/>} />
        <Route path='/characters' element={<CharacterSearch/>}/>
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>

    </div>
  );
}

export default App;

