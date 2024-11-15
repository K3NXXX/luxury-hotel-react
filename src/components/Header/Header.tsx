import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/header/logo.png'
import styles from './Header.module.scss'
import { PAGES } from '../../constants/url.constants'

const Header: React.FC = () => {
	return (
		<header className={styles.root}>
			<div className={styles.content}>
				<div className={styles.left}>
					<Link to={PAGES.HOME}>
						<img src={logo} alt='logo' />
					</Link>
				</div>
				<div className={styles.right}></div>
			</div>
		</header>
	)
}

export default Header
