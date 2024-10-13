import './App.css';
import ListUsers from './components/ListUsers.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/"  element={<HomePage></HomePage>}></Route>
        <Route path="/list"  element={<ListUsers/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
