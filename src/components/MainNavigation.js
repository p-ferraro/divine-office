import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';
import "./MainNavigation.module.css"
import "../fonts/Linotte.woff"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

function MainNavigation() {

  return (
    <header className={classes.header}>
      <script src="https://kit.fontawesome.com/9a61e93f1b.js" crossorigin="anonymous"></script>
      <nav>
        <ul className={classes.list}>
        <li className="listItem">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <FontAwesomeIcon  className="home" icon={faHouse} />
            </NavLink>
          </li>
          <li className="listItem">
            <NavLink
              to="/matins"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Matins
            </NavLink>
          </li>
          <li className="listItem">
            <NavLink
              to="/lauds"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Lauds
            </NavLink>
          </li>
          <li className="listItem">
            <NavLink
              to="/terce"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Terce
            </NavLink>
            </li>
            <li className="listItem">
            <NavLink
              to="/sext"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Sext
            </NavLink>
            </li>
            <li className="listItem">
            <NavLink
              to="/none"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              None
            </NavLink>
          </li>
          <li className="listItem">
            <NavLink
              to="/vespers"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Vespers
            </NavLink>
          </li>
          <li className="listItem">
            <NavLink
              to="/compline"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Compline
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
