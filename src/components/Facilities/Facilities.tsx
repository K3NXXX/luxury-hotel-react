import React from 'react'
import { facilitiesList } from '../../lists/facilities.list'
import styles from './Facilities.module.scss'

const Facilities: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<h2>Hotel Facilities</h2>
				<h3>Finest And Luxurious Hotel In The Town</h3>
				<p className={styles.text}>
					A wonderful serenity has taken possession of my entire soul, like
					these sweet<br/> mornings of spring which I enjoy with my whole heart.
				</p>
				<ul className={styles.list}>
					{facilitiesList.map(item => (
						<li className={styles.item}>
							<img src={item.image} alt={item.label} />
							<p>{item.label}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Facilities
