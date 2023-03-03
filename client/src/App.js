import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './views/HomePage';
import BookDetails from './views/BookDetails';
import book_logo from '../src/images/book_logo.png'

function App() {

  return (
    <div className="App container">
        <div className='d-flex justify-content-between m-3'>
        <div className='d-flex justify-content-center m-3'>
          <img src={book_logo} alt='book shelf logo' style={{ width: '60px' }} />
          <h1 className='mx-3'>BookQuest</h1>
        </div>
        <Link to="/" className='btn m-3 font-weight-bolder shadow' style={{backgroundColor:"#3D728B", height: '40px', color: 'white'}}>Home</Link>
        </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="books/:id" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
