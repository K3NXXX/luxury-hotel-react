import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import style from './Auth.module.scss'

import { CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import { authService } from '../../services/auth.service'
import { IUser } from '../../types/user.type'
import SignupComplete from './SignupComplete'

const Signup: React.FC = () => {
	const [complete, setComplete] = useState(false)
	const [isChecked, setIsChecked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<IUser>({ reValidateMode: 'onSubmit' })

	const { mutate } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IUser) => authService.signup(data),
		onMutate() {
			setIsLoading(true)
		},
		onSuccess(data) {
			toast.success('Verification code sent. Please check your email')
			reset()
			setComplete(true)
		},
		onError(error: any) {
			toast.error(error.response.data.error)
		},
		onSettled() {
			setIsLoading(false)
		},
	})

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked
		setIsChecked(checked)

		setValue('termsAccepted', checked)
	}

	const onSubmit = (data: IUser) => {
		mutate(data)
	}

	return (
		<div className={style.authContainer}>
			<div className={style.auth}>
				<div className={style.left}></div>
				<div className={style.right}>
					{complete ? (
						<SignupComplete />
					) : (
						<>
							<div className={style.header}>
								<div>
									<p>Already have an account?</p>
									<Link to='/auth/login' className={style.login}>
										Log in
									</Link>
								</div>
							</div>
							<div className={style.wrapper}>
								<h1>Create an account</h1>
								<form onSubmit={handleSubmit(onSubmit)} className={style.form}>
									<div className={style.input_box}>
										<input
											{...register('name', {
												required: 'Name is required',
												minLength: {
													value: 3,
													message: 'Name must be at least 3 characters long',
												},
												maxLength: {
													value: 50,
													message: 'Full name must not exceed 50 characters',
												},
												pattern: {
													value: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]+$/,
													message: 'Full name can only include letters',
												},
											})}
											className={style.input_field}
											placeholder=' '
											type='text'
										/>

										<label htmlFor='name' className={style.label}>
											Name
										</label>
									</div>
									<p className={style.error}>
										{errors.name ? errors.name.message : ''}
									</p>

									<div className={style.input_box}>
										<input
											{...register('email', {
												required: 'Email is required',
												pattern: {
													value:
														/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
													message: 'Enter a valid email address',
												},
												maxLength: {
													value: 100,
													message: 'Email must not exceed 100 characters',
												},
											})}
											className={style.input_field}
											placeholder=' '
											type='email'
										/>

										<label htmlFor='email' className={style.label}>
											Email
										</label>
									</div>
									<p className={style.error}>
										{errors.email ? errors.email.message : ''}
									</p>

									<div className={style.input_box}>
										<input
											{...register('password', {
												required: 'Password is required',
												minLength: {
													value: 8,
													message:
														'Password must be at least 8 characters long',
												},
												pattern: {
													value: /\d/,
													message: 'Password must contain at least one number',
												},
											})}
											className={style.input_field}
											placeholder=' '
											type='password'
										/>

										<label htmlFor='password' className={style.label}>
											Password
										</label>
									</div>
									<p className={style.error}>
										{errors.password ? errors.password.message : ''}
									</p>

									<div className={style.terms}>
										<input
											type='checkbox'
											checked={isChecked}
											onChange={handleCheckboxChange}
										/>
										<p>
											By creating an account, I agree to our{' '}
											<span>Terms of use</span> and <span>Privacy Policy</span>
										</p>
									</div>

									<button
										type='submit'
										className={`${
											isChecked ? style.submitButton : style.disabled
										}`}
										disabled={!isChecked || isLoading}
									>
										{isLoading ? (
											<CircularProgress size='30px' sx={{ color: '#fff' }} />
										) : (
											'Get started'
										)}
									</button>
								</form>

								<div className={style.or}>
									<div className={style.line} />
									<span className={style.span}>OR</span>
									<div className={style.line} />
								</div>

								<div className='google'></div>
							</div>
						</>
					)}
				</div>
				{/*<RegisterErrors errors={errors} />*/}
			</div>
		</div>
	)
}

export default Signup
