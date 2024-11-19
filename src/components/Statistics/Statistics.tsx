import React from 'react'
//@ts-ignore
import 'animate.css'
import { CiStar } from 'react-icons/ci'
import { PiHouseThin } from 'react-icons/pi'
import { useInView } from 'react-intersection-observer'
import designImage from '../../assets/home/statistics/statistics.png'
import styles from './Statistics.module.scss'

const Statistics: React.FC = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.5,
	})
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<div className={styles.left}>
					<img
						ref={ref}
						src={designImage}
						alt='hotel design'
						className={`${inView ? 'animate__animated animate__fadeIn' : ''} ${
							styles.image
						}`}
					/>
				</div>
				<div
					ref={ref}
					className={`${inView ? 'animate__animated animate__fadeInDown' : ''} ${
						styles.right
					}`}
				>
					<p className={styles.text1}>THE BEST LUXURY HOTEL</p>
					<p className={styles.text2}>
						Find the right Apartment Hotel & Resort for you
					</p>
					<p className={styles.text3}>
						Over 39,000 people work for us in more than 70 countries all over
						the This breadth of global coverage, combined with specialist
						services
					</p>
					<div className={styles.cards}>
						<div className={styles.item}>
							<div className={styles.icon__wrapper}>
								<CiStar className={styles.icon} size='40' />
							</div>
							<div className={styles.text__wrapper}>
								<p>5 Star Hotel In World</p>
								<p>
									Luxury, elegance, and world-class service await at a top
									5-star hotel.
								</p>
							</div>
						</div>
						<div className={styles.item}>
							<div className={styles.icon__wrapper}>
								<PiHouseThin className={styles.icon} size='40' />
							</div>
							<div className={styles.text__wrapper}>
								<p>Best Environment</p>
								<p>
									Experience ultimate comfort in a serene and luxurious
									environment.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Statistics
