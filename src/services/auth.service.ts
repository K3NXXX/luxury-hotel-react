import { IChangeUserData, IUser } from '../types/user.type'
import axios from '../utils/axios'

class AuthService {
	private BASE_URL = 'https://luxury-hotel-60c7b53289ed.herokuapp.com'

	async signup(user: any) {
		try {
			const { data } = await axios.post<any>(
				`${this.BASE_URL}/api/auth/signup`,
				user
			)
			return data
		} catch (error: any) {
			console.error('Signup error:', error.response?.data || error.message)
			throw error
		}
	}

	async signupComplete(verificationCode: string) {
		try {
			const { data } = await axios.post(
				`${this.BASE_URL}/api/auth/signup/complete`,
				{ verification_code: verificationCode }
			)

			if (data.token) {
				window.localStorage.setItem('jwt', data.token)
			}

			console.log(data)
			return data
		} catch (error: any) {
			console.error(
				'Signup complete error:',
				error.response?.data || error.message
			)
			throw error
		}
	}

	async login(formData: IUser) {
		const { data } = await axios.post<IUser>(
			`${this.BASE_URL}/api/auth/login`,
			formData
		)
		return data
	}

	async editUserData(formData: IChangeUserData) {
		try {
			const { data } = await axios.put(`${this.BASE_URL}/api/user`, formData)
			return data
		} catch (error: any) {
			console.log(error)
			throw new Error(error.response.data.error)
		}
	}

	async getMe() {
		try {
			const { data } = await axios.get(`/auth/me`)
			return data
		} catch (error) {
			console.error('Error fetching user data:', error)
			throw error
		}
	}

	async getUserData() {
		try {
			const { data } = await axios.get(`/api/auth/check`)
			return data
		} catch (error) {
			console.error('Error fetching user data:', error)
			throw error
		}
	}

	async logout() {
		try {
			const { data } = await axios.delete('api/auth/logout')
			return data
		} catch (error) {
			console.log(error)
			throw new Error('Loging out failed')
		}
	}
}

export const authService = new AuthService()
