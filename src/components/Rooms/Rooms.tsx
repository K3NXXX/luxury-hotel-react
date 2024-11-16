import React from 'react'
import { roomList } from '../../lists/rooms.lists'
import styles from './Rooms.module.scss'
import { Link } from 'react-router-dom'

const Rooms: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<h2>The luxury hotel</h2>
					<h3>Rooms</h3>
					<ul className={styles.room__list}>
						{roomList.map(item => (
							<li
								style={{ backgroundImage: `url(${item.image})` }}
								className={styles.room__item}
							>
								<div
									className={`${styles.front}`}
									style={{ backgroundImage: `url(${item.image})` }}
								>
									<div className={styles.text__wrapper}>
										<p className={styles.room__type}>{item.label}</p>
										<p className={styles.room__descr}>{item.description}</p>
									</div>
									<div className={styles.price__wrapper}>
										<p className={styles.price}>From ${item.price}/night</p>
									</div>
								</div>
								<div className={styles.back}>
									<p className={styles.back__room_type}>{item.label}</p>
									<p className={styles.back__room_descr}>{item.descriptionBack}</p>
									<Link to={item.url} className={styles.btn}>Book now</Link>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Rooms
