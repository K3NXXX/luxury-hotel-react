import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Rating,
	TextField,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { roomService } from '../../services/rooms.service'
import { IFeedback } from '../../types/rooms.type'
import styles from './Feedback.module.scss'

interface IFeedbackProps {
	open: boolean
	onClose: () => void
	roomType: string | null
	roomId: string | null
}

const Feedback: React.FC<IFeedbackProps> = ({ open, onClose, roomType, roomId }) => {
	const [value, setValue] = useState<number | null>(5)
	const [text, setText] = useState<null | string>(null)

	const { mutate } = useMutation({
		mutationKey: ['leaveFeedback'],
		mutationFn: (data: IFeedback) => roomService.leaveFeedback(data),
		onSuccess: () => {
			toast.success('Feedback was left successfully')
			onClose()
		},
		onError: (error: any) => {
			toast.error('You have already left feedback for this type of room')
		},
	})

	const onSubmit = (e: any) => {
		e.preventDefault()
		const feedbackData = {
			roomId: roomId,
			roomType: roomType,
			rating: value,
			comment: text,
		}
		//@ts-ignore
		mutate(feedbackData)
	}
	return (
		<Dialog
			className={styles.dialog}
			open={open}
			PaperProps={{
				sx: {
					width: '100%',
					maxWidth: '600px',
					margin: '0 auto',
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
					Leave your feedback
				</DialogContentText>
				<TextField
					margin='dense'
					id='feedback'
					name='feedback'
					label='Your feedback'
					multiline
					rows={10}
					fullWidth
					variant='outlined'
					sx={{ marginBottom: '20px' }}
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<Rating
					name='simple-controlled'
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue)
					}}
					sx={{
						fontSize: '25px',
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} sx={{ color: '#dba765', fontSize: '16px' }}>
					Cancel
				</Button>
				<Button
					onClick={onSubmit}
					sx={{ color: '#dba765', fontSize: '16px' }}
					type='submit'
				>
					Send feedback
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default Feedback
