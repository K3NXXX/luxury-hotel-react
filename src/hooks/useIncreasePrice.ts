import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export const useIncreasePrice = () => {
  const [totalPrice, setTotalPrice] = useState(100);
  const [capacity, setCapacity] = useState<number>(1);
  const [foodDelivery, setFoodDelivery] = useState(false);
  const [romanticPackage, setRomanticPackage] = useState(false);
  const [familyResort, setFamilyResort] = useState(false);

  const [checkInDate, setCheckInDate] = useState(dayjs('2024-11-20'));
  const [checkOutDate, setCheckOutDate] = useState(dayjs('2024-11-27'));

  const handleChangeCapacity = (event: SelectChangeEvent<number>) => {
    setCapacity(event.target.value as number);
  };

  const calculateTotalPrice = () => {
    const nights = checkOutDate.diff(checkInDate, 'day');
    const pricePerNight = capacity === 1 ? 100 : 150; 
    let price = nights * pricePerNight;

    if (foodDelivery) price += 20;
    if (romanticPackage) price += 40;
    if (familyResort) price += 50;

    return price;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [capacity, foodDelivery, romanticPackage, familyResort, checkInDate, checkOutDate]);

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
  };
};
