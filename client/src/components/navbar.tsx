import { NavLink } from "react-router-dom"
import './navbar.css'
import img from '../../../img.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
            <img className="img-nv" src={img} alt="Prisha Policy" />
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/favourites">Favourites</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar