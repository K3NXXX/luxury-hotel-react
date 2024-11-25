import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	FormControlLabel,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'

interface IAddServicesProps {
	open: boolean
	onClose: () => void
	extraServices: string[] | null
}

const predefinedServices = [
	{ name: 'Romantic package', price: 180 },
	{ name: 'Family resort', price: 220 },
	{ name: 'Relax package', price: 200 },
]

const AddServices: React.FC<IAddServicesProps> = ({
	open,
	onClose,
	extraServices,
}) => {
	const [selectedServices, setSelectedServices] = useState<string[]>([])
	const [price, setPrice] = useState(0)

	const handleServiceChange = (service: string, servicePrice: number) => {
		setSelectedServices(prev => {
			if (prev.includes(service)) {
				setPrice(prevPrice => prevPrice - servicePrice)
				return prev.filter(item => item !== service)
			} else {
				setPrice(prevPrice => prevPrice + servicePrice)
				return [...prev, service]
			}
		})
	}

	const handleClose = () => {
		onClose()
		setSelectedServices([])

	}

	return (
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
					Add services
				</DialogContentText>
				<Box>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: '250px 1fr',
							padding: '0 20px',
						}}
					>
						{extraServices && extraServices.length > 0 && (
							<Box sx={{ marginBottom: '20px' }}>
								<Typography
									variant='h6'
									sx={{ fontWeight: '500', marginBottom: '10px' }}
								>
									Active Services:
								</Typography>
								{extraServices.map(service => (
									<Typography
										key={service}
										sx={{ fontSize: '16px', color: '#555' }}
									>
										- {service}
									</Typography>
								))}
							</Box>
						)}
						<Box>
							<Typography
								variant='h6'
								sx={{ fontWeight: '500', marginBottom: '10px' }}
							>
								You should add:
							</Typography>
							<Box sx={{ display: 'flex', flexDirection: 'column' }}>
								{predefinedServices.map(service => {
									if (!extraServices?.includes(service.name)) {
										return (
											<FormControlLabel
												key={service.name}
												control={
													<Checkbox
														checked={selectedServices.includes(service.name)}
														onChange={() =>
															handleServiceChange(service.name, service.price)
														}
													/>
												}
												label={`${service.name} `}
											/>
										)
									}
									return null
								})}
							</Box>
						</Box>
					</Box>
					<p style={{ color: '#dba765', fontSize: '20px', marginTop: '30px' }}>
						Total price:
						<span
							style={{
								paddingLeft: '10px',
								fontSize: '20px',
								fontWeight: '300',
								color: '#4d4d4d',
							}}
						>
							{price}$
						</span>
					</p>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} sx={{ color: '#dba765', fontSize: '16px' }}>
					Cancel
				</Button>
				<Button sx={{ color: '#dba765', fontSize: '16px' }} type='submit'>
					Add services
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddServices
