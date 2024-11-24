import { SelectChangeEvent } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export const useIncreasePrice = (roomType: string | undefined) => {
  const [totalPrice, setTotalPrice] = useState(100)
  const [capacity, setCapacity] = useState<number>(1)
  const [foodDelivery, setFoodDelivery] = useState(false)
  const [romanticPackage, setRomanticPackage] = useState(false)
  const [familyResort, setFamilyResort] = useState(false)

  const [checkInDate, setCheckInDate] = useState(dayjs('2024-12-15'))
  const [checkOutDate, setCheckOutDate] = useState(dayjs('2024-12-22'))

  const handleChangeCapacity = (event: SelectChangeEvent<number>) => {
    setCapacity(event.target.value as number)
  }

  const calculateTotalPrice = () => {
    const nights = checkOutDate.diff(checkInDate, 'day')

    let pricePerNight = 100
    if (roomType === 'standard') {
      pricePerNight = 100
    } else if (roomType === 'deluxe') {
      pricePerNight = 150
    } else if (roomType === 'president') {
      pricePerNight = 300
    }

    if (capacity === 2) {
      pricePerNight += 50  
    } else if (capacity === 3) {
      pricePerNight += 80  
    } else if (capacity === 4) {
      pricePerNight += 100 
    }

    let price = nights * pricePerNight

    if (foodDelivery) price += 20
    if (romanticPackage) price += 40
    if (familyResort) price += 50

    return price
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setTotalPrice(calculateTotalPrice())
  }, [
    capacity,
    foodDelivery,
    romanticPackage,
    familyResort,
    checkInDate,
    checkOutDate,
    roomType,  
  ])

  return {
    totalPrice,
    capacity,
    handleChangeCapacity,
    setFoodDelivery,
    foodDelivery,
    setRomanticPackage,
    romanticPackage,
    setFamilyResort,
    familyResort,
    checkInDate,
    checkOutDate,
    setCheckInDate,
    setCheckOutDate,
  }
}
