import React, { useState, useEffect } from 'react';
import styles from "./ReservationForm.module.scss";
import { Checkbox, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useIncreasePrice } from '../../hooks/useIncreasePrice';

const ReservationForm: React.FC = () => {
  const {
    totalPrice,
    capacity,
    handleChangeCapacity,
    setFoodDelivery,
    foodDelivery,
    romanticPackage,
    setRomanticPackage,
    familyResort,
    setFamilyResort,
    checkInDate,
    checkOutDate,
    setCheckInDate,
    setCheckOutDate,
  } = useIncreasePrice();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={`${styles.reservation}`}>
        <form>
          <p className={styles.reservation__text}>Your Reservation</p>
          <div className={styles.formContent}>
            <div className={styles.input__wrapper}>
              <label>Check in</label>
              <DatePicker
                value={checkInDate}
				onChange={(newValue) => {
					if (newValue !== null) {
					  setCheckInDate(newValue);
					}
				  }}
              />
            </div>
            <div className={styles.input__wrapper}>
              <label>Check out</label>
              <DatePicker
                value={checkOutDate}
				onChange={(newValue) => {
					if (newValue !== null) {
					  setCheckOutDate(newValue);
					}
				  }}
              />
            </div>

            <div className={styles.input__wrapper}>
              <label>Beds</label>
              <Select value={capacity} onChange={handleChangeCapacity}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
              </Select>
            </div>
            <div className={styles.input__wrapper}>
              <label>Extra services</label>
              <div className={styles.extra}>
                <Checkbox
                  onChange={() => setFoodDelivery(!foodDelivery)}
                />
                <p>Food delivery</p>
              </div>
              <div className={styles.extra}>
                <Checkbox
                  onChange={() => setRomanticPackage(!romanticPackage)}
                />
                <p>Romantic package</p>
              </div>
              <div className={styles.extra}>
                <Checkbox
                  onChange={() => setFamilyResort(!familyResort)}
                />
                <p>Family resort</p>
              </div>
            </div>
          </div>
          <div className={styles.price__wrapper}>
            <p className={styles.text}>Total Price: </p>
            <p className={styles.total__price}>{totalPrice}$</p>
          </div>

          <button className={styles.btn}>Check Reservation</button>
        </form>
      </div>
    </LocalizationProvider>
  );
};

export default ReservationForm;
