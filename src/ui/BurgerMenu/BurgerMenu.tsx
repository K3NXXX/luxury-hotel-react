import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import { headerMenu } from '../../lists/header.menu.list'
import './BurgerMenu.css'
import { PAGES } from '../../constants/url.constants'

const BurgerMenu: React.FC = () => {
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
		<Menu>
			{updatedMenu.map(item => (
				<ul key={item.id} className='header-menu-list'>
					<Link  className='menu-item' to={item.url}>{item.label}</Link>
				</ul>
			))}
		</Menu>
	)
}

export default BurgerMenu
