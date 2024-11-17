import React from 'react'
import restaurantImage from '../../assets/home/restaurant/1.jpg'
import styles from './Restaurant.module.scss'
const Restaurant: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<div className={styles.left}>
					<img src={restaurantImage} alt='restaurant' />
				</div>
				<div className={styles.right}>
					<div className={styles.text__wrapper}>
						<p className={styles.text1}>THE BEST LUXURY HOTEL</p>
						<p className={styles.text2}>Relaxing Moments at Our Restaurant.</p>
						<p className={styles.text3}>
							A cozy restaurant offering a wide variety of delicious dishes, a
							warm and inviting atmosphere, and top-notch service. Perfect for
							family gatherings, romantic evenings, or business meetings. Enjoy
							fresh ingredients, expertly crafted meals, and a memorable dining
							experience."
						</p>
						<ul className={styles.list}>
							<li>Interactive Table Ordering</li>
							<li>Personalized Dining Experience</li>
							<li>Augmented Reality (AR) Menus</li>
							<li>Dynamic Atmosphere</li>
							<li>Smart Kitchen Technology</li>
						</ul>
						<button className={styles.btn}>Book now</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Restaurant
