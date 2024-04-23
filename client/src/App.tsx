import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home';
import AddBookPage from './pages/addBookPage';
import Favourites from './pages/favourites';
import BookView from './pages/bookView';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <Navbar/>
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
