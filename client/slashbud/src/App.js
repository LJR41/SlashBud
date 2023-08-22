import logo from './logo.svg';
import './App.css';
import APITest from './Components/APITest';
import { Routes, Route, Link } from 'react-router-dom';
import SignIn from './Components/SignIn';

function App() {
  return (
    <div className="App">
      <p>First Merge Commit</p>
      <APITest/>
      <Routes>
        <Route path='/register' element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
