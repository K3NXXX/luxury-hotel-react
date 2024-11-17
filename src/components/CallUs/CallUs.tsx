import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { IoCallOutline } from 'react-icons/io5'
import styles from './CallUs.module.scss'

const CallUs: React.FC = () => {
	const [roomType, setRoomType] = useState<string>('Standart')
	const [capacity, setCapacity] = useState<number>(1)

	const handleChangeRoomType = (event: SelectChangeEvent<string>) => {
		setRoomType(event.target.value as string)
	}

	const handleChangeCapacity = (event: SelectChangeEvent<number>) => {
		setCapacity(event.target.value as number)
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
									<IoCallOutline className={styles.icon} size={64} color='#dba765' />
								</div>
								<div className={styles.phone__right}>
									<p>880 987 654 765</p>
									<span>For More Information</span>
								</div>
							</div>
						</div>
						<div className={styles.right}>
							<form className={styles.bookingForm}>
								<p>Rooms</p>
								<span>Hotel Booking Form</span>
								<div className={styles.formContent}>
									<div className={styles.input__wrapper}>
										<label>Check in</label>
										<DatePicker defaultValue={dayjs('2024-04-17')} />
									</div>
									<div className={styles.input__wrapper}>
										<label>Check out</label>
										<DatePicker defaultValue={dayjs('2024-04-17')} />
									</div>
									<div className={styles.input__wrapper}>
										<label>Room type</label>
										<Select value={roomType} onChange={handleChangeRoomType}>
											<MenuItem value='Standart'>Standart</MenuItem>
											<MenuItem value='Deluxe'>Deluxe</MenuItem>
											<MenuItem value='President'>President</MenuItem>
											<MenuItem value='Custom'>Custom</MenuItem>
										</Select>
									</div>
									<div className={styles.input__wrapper}>
										<label>Capacity</label>
										<Select value={capacity} onChange={handleChangeCapacity}>
											<MenuItem value='1'>1</MenuItem>
											<MenuItem value='2'>2</MenuItem>
											<MenuItem value='3'>3</MenuItem>
											<MenuItem value='4'>4</MenuItem>
											<MenuItem value='5'>5</MenuItem>
											<MenuItem value='6'>6</MenuItem>
											<MenuItem value='7'>7</MenuItem>
										</Select>
									</div>
								</div>
								<button className={styles.btn}>Check now</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</LocalizationProvider>
	)
}

export default CallUs
