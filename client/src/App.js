import './App.css';
import ListUsers from './components/ListUsers.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import TaskBoard from './components/TaskBoard.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/"  element={<HomePage></HomePage>}></Route>
        <Route path="/list"  element={<ListUsers/>}></Route>
        <Route path="/all_tasks"  element={<TaskBoard/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
