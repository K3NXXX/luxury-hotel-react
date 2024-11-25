import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import CancelBooking from '../../ui/CancelBooking/CancelBooking'
import Feedback from '../../ui/Feedback/Feedback'

import { PAGES } from '../../constants/url.constants'
import { authService } from '../../services/auth.service'
import { roomService } from '../../services/rooms.service'
import { IBooking } from '../../types/rooms.type'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { CiBookmarkCheck, CiUser } from 'react-icons/ci'
import avatar from '../../assets/profile/avatar.png'
import AddServices from '../../ui/AddServices/AddServices'
import ExtendBooking from '../../ui/ExtendBooking/ExtendBooking'
import styles from './Profile.module.scss'

const Profile: React.FC = () => {
	const [section, setSection] = useState(1)
	const [openFeedback, setOpenFeedback] = useState(false)
	const [openCanceling, setOpenCanceling] = useState(false)
	const [openExtendBooking, setOpenExtendBooking] = useState(false)
	const [openAddServices, setOpenAddServices] = useState(false)
	const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null)
	const [bookingId, setBookingId] = useState<string | null>(null)
	const [roomId, setRoomId] = useState<string | null>(null)
	const [roomType, setRoomType] = useState<string | null>(null)
	const [extraServices, setExtraServices] = useState<string[] | null>(null)
	const [checkOutData, setCheckOutData] = useState<string | null>(null)

	const handleClose = () => setOpenFeedback(false)
	const handleCloseCanceling = () => setOpenCanceling(false)
	const handleCloseAddServices = () => setOpenAddServices(false)
	const handleCloseExtendBooking = () => {
		setOpenExtendBooking(false)
		setCheckOutData(null)
		setRoomType(null)
		setExtraServices(null)
	}

	const { data: userData, isLoading: isUserDataLoading } = useQuery({
		queryKey: ['userData'],
		queryFn: () => authService.getUserData(),
	})

	const { data: userBookings, isLoading: isBookingsLoading } = useQuery({
		queryKey: ['userBookings'],
		queryFn: () => roomService.getUserBookings(),
	})
	console.log('get', userBookings)

	const getFormattedDate = () => {
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		}
		return new Date().toLocaleDateString('en-GB', options)
	}

	const capitalizeFirstLetter = (text: string) => {
		if (!text) return ''
		return text.charAt(0).toUpperCase() + text.slice(1)
	}

	if (isUserDataLoading || isBookingsLoading) {
		return <div className={styles.loading}></div>
	}

	return (
		<div className={styles.root}>
			<div className={styles.bg}>
				<div className={styles.wrapper}>
					<div className={styles.text__wrapper}>
						<p className={styles.text1}>Profile</p>
						<div className={styles.links}>
							<Link to={PAGES.HOME}>HOME</Link>
							<span>&gt;</span>
							<p>PROFILE</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.left}>
					<CiUser
						onClick={() => setSection(1)}
						className={styles.icon}
						color='#dba765'
						size={30}
					/>
					<CiBookmarkCheck
						onClick={() => setSection(2)}
						className={styles.icon}
						color='#dba765'
						size={30}
					/>
				</div>
				<div className={styles.right}>
					{section === 1 ? (
						<>
							<p className={styles.welcome}>Welcome, {userData.user.name}</p>
							<p className={styles.date}>{getFormattedDate()}</p>
							<div className={styles.info}>
								<div className={styles.info__left}>
									<div className={styles.avatar}>
										<div className={styles.avatar__left}>
											<img src={avatar} alt='avatar' />
										</div>
										<div className={styles.avatar__right}>
											<p className={styles.name}>{userData.user.name}</p>
											<p className={styles.email}>{userData.user.email}</p>
										</div>
									</div>
								</div>
								<div className={styles.info__right}></div>
							</div>
						</>
					) : (
						<>
							<p className={styles.welcome}>Your bookings</p>
							<ul className={styles.bookingsList}>
								{userBookings && userBookings.length > 0 ? (
									userBookings.map((item: IBooking) => (
										<Accordion className={styles.item} key={item.id}>
											<AccordionSummary
												expandIcon={<ExpandMoreIcon />}
												aria-controls='panel1-content'
												id='panel1-header'
											>
												<div className={styles.accordionFront}>
													<p>{capitalizeFirstLetter(item.room.type)} room</p>
													<p>
														Check in:{' '}
														{dayjs(item.checkInDate).format('YYYY-MM-DD')}
													</p>
													<p>
														Check out:{' '}
														{dayjs(item.checkOutDate).format('YYYY-MM-DD')}
													</p>
													<p className={styles.price}>Price: {item.price}$</p>
													<p>
														Status:
														<span
															className={`${styles.status} 
															${item.status === 'active' ? styles.active : ''} 
															${item.status === 'completed' ? styles.completed : ''} 
															${item.status === 'canceled' ? styles.canceled : ''}`}
														>
															{item.status}
														</span>
													</p>
												</div>
											</AccordionSummary>
											<AccordionDetails>
												<div className={styles.accordionBack}>
													<div className={styles.services}>
														<p className={styles.services__text}>
															Extra services:
														</p>
														{item.extraServices.length > 0 ? (
															<ul>
																{item.extraServices.map((service, index) => (
																	<li key={index}>{service}</li>
																))}
															</ul>
														) : (
															<p className={styles.none}>none</p>
														)}
														<p className={styles.services__text}>
															Beds: <span>{item.room.beds}</span>
														</p>
													</div>
													<div className={styles.buttons}>
														<div
															onClick={() => {
																setOpenAddServices(true)
																setExtraServices(item.extraServices)
															}}
														>
															<button>Add services</button>
														</div>
														<div
															onClick={() => {
																setOpenExtendBooking(true)
																setCheckOutData(item.checkOutDate)
																setRoomType(item.room.type)
																setExtraServices(item.extraServices)
																setBookingId(item.id)
															}}
														>
															<button>Extend booking</button>
														</div>
														<div
															onClick={() => {
																setOpenFeedback(true)
																setRoomId(item.roomId)
																setSelectedRoomType(item.room.type)
															}}
														>
															<button>Leave feedback</button>
														</div>
														{item.status === 'canceled' ||
														item.status === 'completed' ? (
															''
														) : (
															<div
																onClick={() => {
																	setOpenCanceling(true)
																	setBookingId(item.id)
																}}
															>
																<button>Cancel booking</button>
															</div>
														)}
													</div>
												</div>
											</AccordionDetails>
										</Accordion>
									))
								) : (
									<p>No bookings found.</p>
								)}
							</ul>
						</>
					)}
				</div>
			</div>
			<Feedback
				open={openFeedback}
				onClose={handleClose}
				roomType={selectedRoomType}
				roomId={roomId}
			/>
			<CancelBooking
				open={openCanceling}
				onClose={handleCloseCanceling}
				bookingId={bookingId}
			/>
			<ExtendBooking
				open={openExtendBooking}
				onClose={handleCloseExtendBooking}
				checkOutData={checkOutData}
				bookingId={bookingId}
				roomType={roomType}
				extraServices={extraServices}
			/>
			<AddServices
				open={openAddServices}
				onClose={handleCloseAddServices}
				extraServices={extraServices}
			/>
		</div>
	)
}

export default Profile
