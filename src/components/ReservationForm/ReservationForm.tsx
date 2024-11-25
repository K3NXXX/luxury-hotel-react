import { Checkbox, MenuItem, Select } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PAGES } from '../../constants/url.constants'
import { useIncreasePrice } from '../../hooks/useIncreasePrice'
import { roomService } from '../../services/rooms.service'
import { IMakeReservation } from '../../types/rooms.type'
import styles from './ReservationForm.module.scss'

interface IReservationFormProps {
	roomType?: string
}

const ReservationForm: React.FC<IReservationFormProps> = ({ roomType }) => {
	const {
		totalPrice,
		capacity,
		handleChangeCapacity,
		setRelaxPackage,
		relaxPackage,
		romanticPackage,
		setRomanticPackage,
		familyResort,
		setFamilyResort,
		checkInDate,
		checkOutDate,
		setCheckInDate,
		setCheckOutDate,
	} = useIncreasePrice(roomType)

	const [selectedServices, setSelectedServices] = React.useState<string[]>([])
	const isAuth = localStorage.getItem('jwt')
	const navigate = useNavigate()

	const toggleService = (service: string) => {
		setSelectedServices(prev =>
			prev.includes(service)
				? prev.filter(item => item !== service)
				: [...prev, service]
		)
	}

	const handleFoodDeliveryChange = () => {
		setRelaxPackage(!relaxPackage)
		toggleService('Relax package')
	}

	const handleRomanticPackageChange = () => {
		setRomanticPackage(!romanticPackage)
		toggleService('Romantic package')
	}

	const handleFamilyResortChange = () => {
		setFamilyResort(!familyResort)
		toggleService('Family resort')
	}

	const { mutate } = useMutation({
		mutationKey: ['makeReservation'],
		mutationFn: (data: IMakeReservation) => roomService.makeReservation(data),
	})

	const onSubmit = (event: any) => {
		const formattedCheckInDate = checkInDate.format('YYYY-MM-DD')
		const formattedCheckOutDate = checkOutDate.format('YYYY-MM-DD')
		event.preventDefault()

		const formData = {
			checkInDate: formattedCheckInDate,
			checkOutDate: formattedCheckOutDate,
			beds: capacity,
			extraServices: selectedServices,
			type: roomType,
			price: totalPrice,
		}
		if (isAuth) {
			mutate(formData)
		} else {
			navigate(PAGES.LOGIN)
			toast.error('You need to be loged in to book')
		}
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div className={`${styles.reservation}`}>
				<form onSubmit={onSubmit}>
					<p className={styles.reservation__text}>Your Reservation</p>
					<div className={styles.formContent}>
						<div className={styles.input__wrapper}>
							<label>Check in</label>
							<DatePicker
								minDate={dayjs()}
								value={checkInDate}
								onChange={newValue => {
									if (newValue !== null) {
										setCheckInDate(newValue)
									}
								}}
							/>
						</div>
						<div className={styles.input__wrapper}>
							<label>Check out</label>
							<DatePicker
								value={checkOutDate}
								minDate={dayjs()}
								onChange={newValue => {
									if (newValue !== null) {
										setCheckOutDate(newValue)
									}
								}}
							/>
						</div>

						<div className={styles.input__wrapper}>
							<label>Beds</label>
							<Select value={capacity} onChange={handleChangeCapacity}>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem
									style={
										roomType === 'deluxe' || roomType === 'president'
											? { display: 'block' }
											: { display: 'none' }
									}
									value={3}
								>
									3
								</MenuItem>
								<MenuItem
									style={
										roomType === 'deluxe' || roomType === 'president'
											? { display: 'block' }
											: { display: 'none' }
									}
									value={4}
								>
									4
								</MenuItem>
							</Select>
						</div>
						<div className={styles.input__wrapper}>
							<label>Relax package</label>
							<div className={styles.extra}>
								<Checkbox onChange={handleFoodDeliveryChange} />
								<p>Relax package</p>
							</div>
							<div className={styles.extra}>
								<Checkbox onChange={handleRomanticPackageChange} />
								<p>Romantic package</p>
							</div>
							<div className={styles.extra}>
								<Checkbox onChange={handleFamilyResortChange} />
								<p>Family resort</p>
							</div>
						</div>
					</div>
					<div className={styles.price__wrapper}>
						<p className={styles.text}>Total Price: </p>
						<p className={styles.total__price}>{totalPrice}$</p>
					</div>

					<button type='submit' className={styles.btn}>
						Check Reservation
					</button>
				</form>
			</div>
		</LocalizationProvider>
	)
}

export default ReservationForm
