import React from 'react'
import { Link } from 'react-router-dom'
import { PAGES } from '../../constants/url.constants'
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<div className={styles.left}>
						<p>Copyright © luxury all rights reserved.</p>
					</div>
					<div className={styles.right}>
						<ul>
							<Link to={PAGES.HOME}>
								<li>Home</li>
							</Link>
							<Link to={PAGES.CONTACT}>
								<li>Contact</li>
							</Link>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
