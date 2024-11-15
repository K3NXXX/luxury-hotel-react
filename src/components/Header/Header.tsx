import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/header/logo.png'
import { PAGES } from '../../constants/url.constants'
import { headerMenu } from '../../lists/header.menu.list'
import BurgerMenu from '../../ui/BurgerMenu/BurgerMenu'
import styles from './Header.module.scss'

const Header: React.FC = () => {
	return (
		<>
			<BurgerMenu />
			<header className={styles.root}>
				<div className={styles.content}>
					<div className={styles.left}>
						<Link to={PAGES.HOME}>
							<img src={logo} alt='logo' />
						</Link>
					</div>
					<div className={styles.right}>
						<ul>
							{headerMenu.map(item => (
								<Link to={item.url}>
									<li key={item.id}>{item.label}</li>
								</Link>
							))}
						</ul>
						<div>
							<button>Check now</button>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}

export default Header
