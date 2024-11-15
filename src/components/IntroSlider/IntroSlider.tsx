import 'animate.css'
import React, { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import { A11y, Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import slide1 from '../../assets/home/intro/slider1.jpg'
import slide2 from '../../assets/home/intro/slider2.jpg'
import styles from './IntroSlider.module.scss'

const IntroSlider: React.FC = () => {
  const [visibleText, setVisibleText] = useState(true)

  const handleSlideChange = () => {
    setVisibleText(false)
    setTimeout(() => setVisibleText(true), 2000) 
  }

  const showSettings = (event: any) => {
    event.preventDefault()
  }

  useEffect(() => {
    setVisibleText(true)
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div
          className={`${styles.text__wrapper} ${!visibleText ? styles.hidden : ''}`}
        >
          <p
            className={`${styles.text__wrapper_1} ${visibleText ? 'animate__animated animate__fadeInLeft' : ''}`}
          >
            This is luxury hotel
          </p>
          <p
            className={`${styles.text__wrapper_2} ${visibleText ? 'animate__animated animate__fadeInDown animate__delay-1s' : ''}`}
          >
            Superior hotel in world
          </p>
          <div
            className={`${styles.line__wrapper} ${visibleText ? 'animate__animated animate__fadeIn animate__delay-1s' : ''}`}
          >
            <div className={styles.line}></div>
          </div>
          <p
            className={`${styles.text__wrapper_3} ${visibleText ? 'animate__animated animate__fadeInUp animate__delay-2s' : ''}`}
          >
            A wonderful serenity has taken possession of my entire soul, like
            these sweet mornings of spring which I enjoy with my whole heart.
          </p>
          <button
            className={`${styles.rooms} ${visibleText ? 'animate__animated animate__fadeIn animate__delay-3s' : ''}`}
          >
            View rooms
          </button>
        </div>
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          allowTouchMove={false}
          speed={1800}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          onSlideChange={handleSlideChange}
          onTouchStart={(swiper: any) => swiper.autoplay.stop()}
          onTouchEnd={(swiper: any) => swiper.autoplay.start()}
        >
          <SwiperSlide>
            <img src={slide1} alt="slide 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide2} alt="slide 2" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default IntroSlider
