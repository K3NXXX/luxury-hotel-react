import { toast } from 'react-toastify'
import { IEndBooking, IReserveTable } from '../types/tables.type'
import axios from '../utils/axios'
import { ICancelBooking } from '../types/rooms.type'

class TablesService {
	private BASE_URL = 'https://luxury-hotel-60c7b53289ed.herokuapp.com'

	async makeReservation(makeResData: IReserveTable) {
		try {
			const { data } = await axios.post('/api/booking/table', makeResData)
			return data
		} catch (error: any) {
			console.log(error)
			throw new Error(error.response.data.error)
		}
	}

	async endBooking(endData: IEndBooking) {
		try {
			const { data } = await axios.put('/api/booking/table/end', endData)
			return data
		} catch (error: any) {
			console.log(error)
			toast.error(error.response.data.error)
		}
	}

}

export const tableService = new TablesService()
