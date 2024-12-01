import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import {
	DatePicker,
	DateTimePicker,
	LocalizationProvider,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PAGES } from '../../constants/url.constants'
import { roomService } from '../../services/rooms.service'
import { IMakeReservation } from '../../types/rooms.type'
import styles from './ReservationForm.module.scss'

const ReservationFormCallRoom: React.FC = () => {
	const [capacity, setCapacity] = useState<number>(1)
	const [checkInDateTime, setCheckInDateTime] = React.useState(dayjs())
	const [checkOutDateTime, setCheckOutDateTime] = React.useState(dayjs())
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const isAuth = localStorage.getItem('jwt')
	const navigate = useNavigate()

	const handleCheckInChange = (newValue: any) => {
		if (newValue !== null) {
			setCheckInDateTime(newValue)
		}
	}

	const handleCheckOutChange = (newValue: any) => {
		if (newValue !== null) {
			setCheckOutDateTime(newValue)
		}
	}

	const handleCapacityChange = (event: SelectChangeEvent<number>) => {
		setCapacity(event.target.value as number)
	}

	const calculateTotalPrice = () => {
		const durationInHours = checkOutDateTime.diff(checkInDateTime, 'hour')
		const price = durationInHours * 20
		setTotalPrice(price)
	}

	useEffect(() => {
		if (checkInDateTime && !checkOutDateTime) {
			setCheckOutDateTime(checkInDateTime.add(1, 'hour'))
		}
		if (checkInDateTime && checkOutDateTime) {
			calculateTotalPrice()
		}
	}, [checkInDateTime, checkOutDateTime])

	const { mutate } = useMutation({
		mutationKey: ['makeReservationCallRoom'],
		mutationFn: (data: IMakeReservation) => roomService.makeReservation(data),
		onSuccess: () => {
			toast.success('Booking room was completed successfully')
		},
		onError: () => {
			toast.error('Booking call room failed. Try again')
		}
	})

	const onSubmit = (event: any) => {
		event.preventDefault()
		const reserveData = {
			checkInDate: checkInDateTime,
			checkOutDate: checkOutDateTime,
			capacity: capacity,
			type: "meeting",
			price: totalPrice
		}
		if (isAuth) {
			//@ts-ignore
			mutate(reserveData)
		} else {
			navigate(PAGES.LOGIN)
			toast.error('You need to be logged in to book')
		}
	}

	const minCheckOutTime = checkInDateTime.add(1, 'hour')

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div className={styles.reservation}>
				<form onSubmit={onSubmit}>
					<p className={styles.reservation__text}>Your Reservation</p>
					<div className={styles.formContent}>
						<div className={styles.input__wrapper}>
							<label>Check in</label>
							<DateTimePicker
								value={checkInDateTime}
								minDateTime={dayjs()}
								onChange={handleCheckInChange}
							/>
						</div>
						<div className={styles.input__wrapper}>
							<label>Check out</label>
							<DateTimePicker
								value={checkOutDateTime}
								minDateTime={minCheckOutTime} 
								onChange={handleCheckOutChange}
							/>
						</div>

						<div className={styles.input__wrapper}>
							<label>Capacity</label>
							<Select
								value={capacity}
								onChange={handleCapacityChange}
								displayEmpty
							>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={6}>6</MenuItem>
								<MenuItem value={7}>7</MenuItem>
								<MenuItem value={8}>8</MenuItem>
								<MenuItem value={9}>9</MenuItem>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={11}>11</MenuItem>
								<MenuItem value={12}>12</MenuItem>
								<MenuItem value={13}>13</MenuItem>
								<MenuItem value={14}>14</MenuItem>
								<MenuItem value={15}>15</MenuItem>
							</Select>
						</div>
					</div>
					<div className={styles.price__wrapper}>
						<p className={styles.text}>Total Price: </p>
						<p className={styles.total__price}>{totalPrice}$ (20$ per hour)</p>
					</div>

					<button type="submit" className={styles.btn}>
						Check Now
					</button>
				</form>
			</div>
		</LocalizationProvider>
	)
}

export default ReservationFormCallRoom
