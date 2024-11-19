import React from 'react'
import { useInView } from 'react-intersection-observer'
import callRoomImage from '../../assets/home/call-rooms/1.jpeg'
import styles from './CallRoom.module.scss'

const CallRoom: React.FC = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.5,
	})
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<div
					ref={ref}
					className={`${inView ? 'animate__animated animate__fadeInLeft' : ''} ${
						styles.right
					}`}
				>
					<div className={styles.text__wrapper}>
						<p className={styles.text1}>THE BEST LUXURY HOTEL</p>
						<p className={styles.text2}>Discuss Business in our Call Rooms.</p>
						<p className={styles.text3}>
							A cozy restaurant offering a wide variety of delicious dishes, a
							warm and inviting atmosphere, and top-notch service. Perfect for
							family gatherings, romantic evenings, or business meetings. Enjoy
							fresh ingredients, expertly crafted meals, and a memorable dining
							experience."
						</p>
						<ul className={styles.list}>
							<li>Smart Glass Windows</li>
							<li>Interactive Whiteboards</li>
							<li>Voice-Controlled Systems</li>
							<li>Modular Furniture</li>
							<li>Real-Time Language Translation</li>
						</ul>
						<button className={styles.btn}>Book now</button>
					</div>
				</div>
				<div ref={ref}  className={`${inView ? 'animate__animated animate__fadeIn' : ''} ${
						styles.left
					}`}>
					<img src={callRoomImage} alt='restaurant' />
				</div>
			</div>
		</div>
	)
}

export default CallRoom
