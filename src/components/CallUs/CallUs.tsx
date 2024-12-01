import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMutation } from '@tanstack/react-query'
import dayjs, { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import { IoCallOutline } from 'react-icons/io5'
import { roomService } from '../../services/rooms.service'
import { IFreeRooms, IGetFreeRooms } from '../../types/rooms.type'
import styles from './CallUs.module.scss'
import FreeRooms from '../../ui/FreeRooms/FreeRooms'

const CallUs: React.FC = () => {
	const [roomType, setRoomType] = useState<string>('standard')
	const [capacity, setCapacity] = useState<number>(1)
	const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs())
	const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs())
	const [openModal, setOpenModal] = useState(false)
	const [freeRooms, setFreeRooms] = useState<null | IFreeRooms[]>(null)

	const handleCloseModal = () => setOpenModal(false)
	console.log('free', freeRooms)

	const handleChangeRoomType = (event: SelectChangeEvent<string>) => {
		setRoomType(event.target.value as string)
	}

	const handleChangeCapacity = (event: SelectChangeEvent<number>) => {
		setCapacity(event.target.value as number)
	}

	const handleCheckInChange = (newValue: Dayjs | null) => {
		setCheckIn(newValue)
	}

	const handleCheckOutChange = (newValue: Dayjs | null) => {
		setCheckOut(newValue)
	}

	const { mutate } = useMutation({
		mutationKey: ['getAllFreeRooms'],
		mutationFn: (data: IGetFreeRooms) => roomService.getAllFreeRooms(data),
		onSuccess: response => {
			setFreeRooms(response)
		},
	})

	const onSubmit = (e: any) => {
		e.preventDefault()
		const data = {
			checkInDate: checkIn,
			checkOutDate: checkOut,
			type: roomType,
			capacity: capacity,
		}
		mutate(data)
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div className={styles.root}>
				<div className={styles.wrapper}>
					<div className={styles.content}>
						<div className={styles.left}>
							<p className={styles.text1}>Call us, it's toll-free.</p>
							<p className={styles.text2}>
								Each of our guest rooms feature a private bath, wi-fi, cable
								television and include full breakfast. And also have awesome
								swing system in the ponds.
							</p>
							<div className={styles.phone}>
								<div className={styles.phone__left}>
									<IoCallOutline
										className={styles.icon}
										size={64}
										color='#dba765'
									/>
								</div>
								<div className={styles.phone__right}>
									<p>880 987 654 765</p>
									<span>For More Information</span>
								</div>
							</div>
						</div>
						<div className={styles.right}>
							<form onSubmit={onSubmit} className={styles.bookingForm}>
								<p>Rooms</p>
								<span>Hotel Booking Form</span>
								<div className={styles.formContent}>
									<div className={styles.input__wrapper}>
										<label>Check in</label>
										<DatePicker
											value={checkIn}
											onChange={handleCheckInChange}
										/>
									</div>
									<div className={styles.input__wrapper}>
										<label>Check out</label>
										<DatePicker
											value={checkOut}
											onChange={handleCheckOutChange}
										/>
									</div>
									<div className={styles.input__wrapper}>
										<label>Room type</label>
										<Select value={roomType} onChange={handleChangeRoomType}>
											<MenuItem value='standard'>Standard</MenuItem>
											<MenuItem value='deluxe'>Deluxe</MenuItem>
											<MenuItem value='president'>President</MenuItem>
										</Select>
									</div>
									<div className={styles.input__wrapper}>
										<label>Capacity</label>
										<Select value={capacity} onChange={handleChangeCapacity}>
											<MenuItem value={1}>1</MenuItem>
											<MenuItem value={2}>2</MenuItem>

											<MenuItem
												style={
													roomType === 'standard'
														? { display: 'none' }
														: { display: 'block' }
												}
												value={3}
											>
												3
											</MenuItem>
											<MenuItem
												style={
													roomType === 'standard'
														? { display: 'none' }
														: { display: 'block' }
												}
												value={4}
											>
												4
											</MenuItem>
										</Select>
									</div>
								</div>
								<button onClick={() => setOpenModal(true)} type='submit' className={styles.btn}>
									Check available rooms
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			{freeRooms && freeRooms?.length > 0 && (
			<FreeRooms open={openModal} onClose={handleCloseModal} freeRooms={freeRooms}/>

			)}
		</LocalizationProvider>
	)
}

export default CallUs
