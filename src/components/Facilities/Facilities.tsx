import React from 'react'
import { useInView } from 'react-intersection-observer'
import { facilitiesList } from '../../lists/facilities.list'
import styles from './Facilities.module.scss'

const Facilities: React.FC = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.5,
	})
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<div
					className={`${
						inView ? 'animate__animated animate__fadeInTopLeft' : ''
					} ${styles.text__wrapper}`}
					ref={ref}
				>
					<h2>Hotel Facilities</h2>
					<h3>Finest And Luxurious Hotel In The Town</h3>
					<p className={styles.text}>
						A wonderful serenity has taken possession of my entire soul, like
						these sweet
						<br /> mornings of spring which I enjoy with my whole heart.
					</p>
				</div>

				<ul
					ref={ref}
					className={`${
						inView ? 'animate__animated animate__fadeInBottomRight' : ''
					} ${styles.list}`}
				>
					{facilitiesList.map(item => (
						<li key={item.id} className={styles.item}>
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
