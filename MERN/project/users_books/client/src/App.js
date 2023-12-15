import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Main from './components/Main';
import OneBooks from './components/OneBooks';
import Create from './components/Create';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
      <div class="navbar">
      <h1 class='maintitle'>📖 Reads & Reviews</h1>
      <div class="nav">
      <Link to="/books/create">Add a Book</Link> 
      <br></br>
      </div>
      <div>
      <Link to="/">Libary</Link>
      </div>
      <div>
        <Link to="/books/:id">About Us</Link>
      </div>
    </div>

      <h1 class="maintitle">All Books 📚</h1>
    


      <Routes>

      {/* DASHBOARD*/}
      <Route path='/' element={<Main />}/>

      {/* READ ONE */}
      <Route path='/books/:id' element={<OneBooks/>}/>
      

      {/* CREATE  */}
      <Route path='/books/create' element={<Create/>}/>  

      {/* UPDATE */}
      <Route path='/books/:id/update' element={<Update/>}/>

      </Routes>
    </div>
  );
}

export default App;
