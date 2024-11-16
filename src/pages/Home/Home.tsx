import React from 'react';
import styles from "./Home.module.scss"
import IntroSlider from '../../components/IntroSlider/IntroSlider'
import Statistics from '../../components/Statistics/Statistics'
import Rooms from '../../components/Rooms/Rooms'
import Facilities from '../../components/Facilities/Facilities'

const Home: React.FC = () => {
	return (
		<div className={styles.root}>
			<IntroSlider/>
			<Statistics/>
			<Rooms/>
			<Facilities/>
		</div>
	);
};

export default Home;