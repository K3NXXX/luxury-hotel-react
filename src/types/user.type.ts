export interface IUser {
	_id?: number
	name: string
	email: string
	password: string

	token?: string
	termsAccepted?: boolean
}

export interface IChangeUserData {
	name: string
	email: string
	oldPassword: string
	newPassword: string
}
