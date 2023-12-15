import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Main from './components/Main';
import OnePirates from './components/OnePirates';
import Create from './components/Create';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
      <h1 class="title">Pirate Crew</h1>
      <Link to="/pirates/create">Add Pirate</Link> <br></br>
      <Link to="/">Crew Board</Link>



      <Routes>

      {/* DASHBOARD*/}
      <Route path='/' element={<Main />}/>

      {/* READ ONE */}
      <Route path='/pirates/:id' element={<OnePirates/>}/>
      

      {/* CREATE  */}
      <Route path='/pirates/create' element={<Create/>}/>  

      {/* UPDATE */}
      <Route path='/pirates/:id/update' element={<Update/>}/>

      </Routes>
    </div>
  );
}

export default App;
