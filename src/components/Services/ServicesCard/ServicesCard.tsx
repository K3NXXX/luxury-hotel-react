import React from 'react'
import { IServisesList } from '../../../lists/services.list'
import styles from './ServicesCard.module.scss'
interface IServicesCardProps {
	item: IServisesList
}
const ServicesCard: React.FC<IServicesCardProps> = ({ item }) => {
	return (
		<li key={item.id} className={styles.card}>
		<img src={item.image} alt="service" />
		<p className={styles.title}>{item.title}</p>
		<ul className={styles.labels__list}>
			{item.list.map((label) => (
				<li className={styles.label__item} key={item.id}>{label.label}</li>
			))}
		</ul>
	</li>
	)
}

export default ServicesCard
