import image1 from '../assets/home/services/1.jpeg'
import image2 from '../assets/home/services/1.jpg'
interface ILabelList {
	label: string
}

export interface IServisesList {
	id: number
	title: string
	image: string
	list: ILabelList[]
}
export const servicesList: IServisesList[] = [
	{
		id: 1,
		title: 'Food delivery',
		image: image1,
		list: [
			{
				label: 'Convenient In-Room Ordering',
			},
			{
				label: 'Fast & Fresh Delivery',
			},
			{
				label: '24/7 Service',
			},
		],
	},
	{
		id: 2,
		title: 'Extra Take Care',
		image: image2,
		list: [
			{
				label: 'Daily Cleaning Service',
			},
			{
				label: 'Custom Cleaning Requests',
			},
			{
				label: 'Eco-Friendly Products',
			},
		],
	},
	{
		id: 3,
		title: 'Food delivery',
		image: image1,
		list: [
			{
				label: 'Convenient In-Room Ordering',
			},
			{
				label: 'Fast & Fresh Delivery',
			},
			{
				label: '24/7 Service',
			},
		],
	},
	{
		id: 4,
		title: 'Extra Take Care',
		image: image2,
		list: [
			{
				label: 'Daily Cleaning Service',
			},
			{
				label: 'Custom Cleaning Requests',
			},
			{
				label: 'Eco-Friendly Products',
			},
		],
	},
]
