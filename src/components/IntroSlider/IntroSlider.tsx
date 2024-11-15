import React from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { A11y, Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import slide1 from '../../assets/home/intro/slider1.jpg'
import slide2 from '../../assets/home/intro/slider2.jpg'
import styles from './IntroSlider.module.scss'

const IntroSlider: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<div className={styles.text__wrapper}>
					<p className={styles.text__wrapper_1}>This is luxury hotel</p>
					<p className={styles.text__wrapper_2}>Superior hotel in world</p>
					<div className={styles.line__wrapper}>
						<div className={styles.line}></div>
					</div>
					<p className={styles.text__wrapper_3}>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.</p>
					<button className={styles.rooms}>View rooms</button>
				</div>
				<Swiper
					modules={[Pagination, A11y, Autoplay]}
					pagination={{ clickable: true }}
					spaceBetween={0}
					slidesPerView={1}
					allowTouchMove={false}
					speed={1800}
				>
					<SwiperSlide>
						<img src={slide1} alt='slide 1' />
					</SwiperSlide>
					<SwiperSlide>
						<img src={slide2} alt='slide 2' />
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	)
}

export default IntroSlider
