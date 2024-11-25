import { toast } from 'react-toastify'
import type { ICancelBooking, IExtendBooking, IFeedback, IMakeReservation } from '../types/rooms.type'
import axios from '../utils/axios'

class RoomService {
	private BASE_URL = 'https://luxury-hotel-60c7b53289ed.herokuapp.com'

	async makeReservation(makeResData: IMakeReservation) {
		try {
			const { data } = await axios.post('/api/booking/room', makeResData)
			console.log('res', data)
			return data
		} catch (error: any) {
			console.log(error)
			toast.error(error.response.data.error)
		}
	}

	async leaveFeedback(feedbackData: IFeedback) {
		try {
			const { data } = await axios.post('/api/room/reviews', feedbackData)
			return data
		} catch (error: any) {
			if (error.response && error.response.status === 409) {
				throw new Error('Feedback already exists for this room.')
			}
		}
	}

	async getRoomFeedbacks(type: string) {
		try {
			const { data } = await axios.get(`api/room/${type}/reviews`)
			return data
		} catch (error: any) {
			console.log('Error during getting room feedbacks')
			
		}
	}

	async cancelBooking(cancelData: ICancelBooking) {
		try {
			const { data } = await axios.put('/api/room/cancel', cancelData )
			return data
		} catch (error: any) {
			console.log('Error during canceling booking')
			throw new Error('Error during cancelling booking')
		}
	}

	async extendBooking(expandData: IExtendBooking) {
		try {
			const { data } = await axios.put('/api/room/extend', expandData )
			return data
		} catch (error: any) {
			console.log('Error during expanding booking')
			throw new Error('Error during expanding booking')
		}
	}

	async getUserBookings() {
		try {
			const { data } = await axios.get('/api/user/bookings')
			return data
		} catch (error: any) {
			console.log(error)
		}
	}
}

export const roomService = new RoomService()
