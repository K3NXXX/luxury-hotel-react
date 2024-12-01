import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'
import { roomService } from '../../services/rooms.service'
import { IExtendBooking } from '../../types/rooms.type'
import { toast } from 'react-toastify'

interface IExtendBookingProps {
	open: boolean
	onClose: () => void
	checkOutData: string | null
	roomType: string | null
	extraServices: string[] | null
	bookingId: string | null
}

const ExtendBooking: React.FC<IExtendBookingProps> = ({
	open,
	onClose,
	checkOutData,
	roomType,
	extraServices,
	bookingId
}) => {
	const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null)
	const [price, setPrice] = useState(0)
	const queryClient = useQueryClient()

	const {mutate} = useMutation({
		mutationKey: ['extendBooking'],
		mutationFn: (data: IExtendBooking) => roomService.extendBooking(data),
		onSuccess: () => {
			toast.success("Booking was extended successfully")
			queryClient.invalidateQueries({queryKey: ['userBookings']})
		},
		onError: () => {
			toast.error("Booking extend failed. Try again")
		}
	})

	const onSubmit = (e: any) => {
		e.preventDefault()
		const formattedCheckOutDate = checkOutDate?.format('YYYY-MM-DD')
		const extendBookingData = {
			bookingId: bookingId,
			price: price,
			newCheckOutDate: formattedCheckOutDate
		}
		//@ts-ignore
		mutate(extendBookingData)
		
		onClose()
	}

	useEffect(() => {
		if (checkOutData) {
			const parsedDate = dayjs(checkOutData)
			setCheckOutDate(parsedDate.isValid() ? parsedDate : null)
		} else {
			setCheckOutDate(null)
		}
	}, [checkOutData])



	useEffect(() => {
		if (checkOutDate && checkOutData && roomType) {
		  const initialDate = dayjs(checkOutData)
		  let totalPrice = 0
	  
		  if (roomType.toLowerCase() === 'meeting') {
			// Calculate price based on hours for "meeting" room type
			const additionalHours = checkOutDate.diff(initialDate, 'hour')
	  
			if (additionalHours > 0) {
			  totalPrice = additionalHours * 20 // Price per hour for meeting rooms
			}
		  } else {
			// Existing logic for other room types
			const additionalDays = checkOutDate.diff(initialDate, 'day')
	  
			if (additionalDays > 0) {
			  let basePrice = 0
	  
			  switch (roomType.toLowerCase()) {
				case 'standard':
				  basePrice = 100
				  break
				case 'deluxe':
				  basePrice = 150
				  break
				case 'president':
				  basePrice = 300
				  break
				default:
				  basePrice = 0
			  }
	  
			  totalPrice = additionalDays * basePrice
			}
		  }
	  
		  setPrice(totalPrice)
		} else {
		  setPrice(0)
		}
	  }, [checkOutDate, checkOutData, roomType, extraServices])
	  

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Dialog
				open={open}
				PaperProps={{
					sx: {
						width: '100%',
						maxWidth: '500px',
						margin: '0 auto',
						minHeight: '300px',
					},
				}}
			>
				<DialogContent>
					<DialogContentText
						sx={{
							textAlign: 'center',
							fontSize: '25px',
							fontWeight: '500',
							marginBottom: '20px',
						}}
					>
						Extend your luxury
					</DialogContentText>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginBottom: '20px',
						}}
					>
						<label>Check out</label>
						<DatePicker
							value={checkOutDate}
							minDate={dayjs()} 
							onChange={newValue => {
								setCheckOutDate(newValue) 
							}}
						/>
					</div>
					<p style={{ color: '#dba765', fontSize: '20px' }}>
						Total price:{' '}
						<span
							style={{
								fontSize: '20px',
								fontWeight: '300',
								color: '#4d4d4d',
							}}
						>
							{price}$
						</span>
					</p>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} sx={{ color: '#dba765', fontSize: '16px' }}>
						Cancel
					</Button>
					<Button onClick={onSubmit} sx={{ color: '#dba765', fontSize: '16px' }} type="submit">
						Extend booking
					</Button>
				</DialogActions>
			</Dialog>
		</LocalizationProvider>
	)
}

export default ExtendBooking


