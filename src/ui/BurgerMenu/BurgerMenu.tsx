import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import { headerMenu } from '../../lists/header.menu.list'
import './BurgerMenu.css'

const BurgerMenu: React.FC = () => {
	return (
		<Menu>
			{headerMenu.map(item => (
				<ul className='header-menu-list'>
					<Link key={item.id} className='menu-item' to={item.url}>{item.label}</Link>
				</ul>
			))}
		</Menu>
	)
}

export default BurgerMenu
