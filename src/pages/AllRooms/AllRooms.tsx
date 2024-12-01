import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PAGES } from '../../constants/url.constants'
import { roomList } from '../../lists/rooms.lists'
import styles from './AllRooms.module.scss'
import Services from '../../components/Services/Services'
import CallUs from '../../components/CallUs/CallUs'

const AllRooms: React.FC = () => {

	return (
		<div className={styles.root}>
			<div className={styles.bg}>
				<div className={styles.wrapper}>
					<div className={styles.text__wrapper}>
						<p className={styles.text1}>Rooms</p>
						<div className={styles.links}>
							<Link to={PAGES.HOME}>HOME</Link>
							<span>&gt;</span>
							<p>ROOMS</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.content__wrapper}>
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
									<p className={styles.back__room_descr}>
										{item.descriptionBack}
									</p>
									<Link to={item.url} className={styles.btn}>
										Book now
									</Link>
								</div>
							</li>
						))}
					</ul>
					<Services/>
					<CallUs/>
				</div>
			</div>
		</div>
	)
}

export default AllRooms
