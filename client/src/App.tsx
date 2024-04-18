import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home';
import AddBookPage from './pages/addBookPage';
import Favourites from './pages/favourites';
import BookView from './pages/bookView';

function App() {
  return (
    <Router>
      <div className="header">
        <div className="logo">Prisha Policy</div>
        <button className="home">
          <a href="/">Home</a>
        </button>
        <button className="favourites">
        <a href="/favourites">Favourites</a>
        </button>
      </div>
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/addBooks" element={<AddBookPage/>} />
        <Route  path="/favourites" element={<Favourites/>} />
        <Route path="/book/:id" element={<BookView/>} />
      </Routes>
    </Router>
  );
}

export default App;
