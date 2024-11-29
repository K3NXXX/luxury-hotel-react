import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/header/logo.png'
import { PAGES } from '../../constants/url.constants'
import { headerMenu } from '../../lists/header.menu.list'
import BurgerMenu from '../../ui/BurgerMenu/BurgerMenu'
import styles from './Header.module.scss'

const Header: React.FC = () => {
  const jwt = localStorage.getItem("jwt")

  const updatedMenu = headerMenu.map(item => {
    if (item.label === "Account") {
      return {
        ...item,
        url: jwt ? PAGES.PROFILE : PAGES.LOGIN,
        label: jwt ? "Profile" : "Login"  
      };
    }
    return item;
  });

  return (
    <>
      <BurgerMenu />
      <header className={styles.header}>
        <div className={styles.content}>
          <div className={styles.left}>
            <Link to={PAGES.HOME}>
              <img src={logo} alt='logo' />
            </Link>
          </div>
          <div className={styles.right}>
            <ul>
              {updatedMenu.map(item => (
                <Link to={item.url} key={item.id}>
                  <li>{item.label}</li>
                </Link>
              ))}
            </ul>
            <div>
              <Link to={PAGES.ALLROOMS}>
                <button>View rooms</button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
