import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Main from './components/Main';
import OneAuthors from './components/OneAuthors';
import Create from './components/Create';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
      <h1>Favorite Authors</h1>
      <Link to="/authors/create">Add an Author</Link> <br></br>
      <Link to="/">Home</Link>


      <Routes>

      {/* DASHBOARD*/}
      <Route path='/' element={<Main />}/>

      {/* READ ONE */}
      <Route path='/authors/:id' element={<OneAuthors/>}/>
      

      {/* CREATE  */}
      <Route path='/authors/create' element={<Create/>}/>  

      {/* UPDATE */}
      <Route path='/authors/:id/update' element={<Update/>}/>

      </Routes>
    </div>
  );
}

export default App;
