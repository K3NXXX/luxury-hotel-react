export interface IMakeReservation {
	checkInDate: string
	checkOutDate: string
	beds: number
	extraServices?: string[]
}

export interface IRoom {
	Reviews: null | number
	beds: string
	description: string
	number: string
	price: string
	type: string
}

export interface IBooking {
	checkInDate: string
	checkOutDate: string
	extraServices: string[]
	createdAt: string
	id: string
	price: string
	roomId: string
	status: string
	userId: string
	room: IRoom
}

export interface IFeedback {
	roomId: string
	rating: number
	comment: string
}

export interface ICancelBooking {
	bookingId: string | null
}

export interface IUser {
	name: string
}

export interface IReview {
	comment: string
	id: string
	rating: string
	roomId: string
	roomType: string
	userId: string
	user: IUser
}

export interface IBookingFeedbacks {
	averageRating: number
	reviews: IReview[]
}

export interface IExtendBooking {
	bookingId: string
	price: string
	checkOutDate: string
}
