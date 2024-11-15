import React from 'react';
import styles from "./Home.module.scss"
import IntroSlider from '../../components/IntroSlider/IntroSlider'

const Home: React.FC = () => {
	return (
		<div className={styles.root}>
			<IntroSlider/>
		</div>
	);
};

export default Home;