import { useState, useEffect } from "react";
import Style from "../BigNFTSilder.module.css";

const TIMER_INTERVAL = 1000; // Timer update interval in milliseconds

function CountdownTimer({ endTime }) {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime(endTime));
    }, TIMER_INTERVAL);
    return () => clearInterval(timer);
  }, [endTime]);

  const days = Math.max(remainingTime.days, 0).toString().padStart(2, "0");
  const hours = Math.max(remainingTime.hours, 0).toString().padStart(2, "0");
  const minutes = Math.max(remainingTime.minutes, 0).toString().padStart(2, "0");
  const seconds = Math.max(remainingTime.seconds, 0).toString().padStart(2, "0");

  return (
    <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
      <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
        <p>{days}</p>
        <span>Days</span>
      </div>
      <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
        <p>{hours}</p>
        <span>Hours</span>
      </div>
      <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
        <p>{minutes}</p>
        <span>mins</span>
      </div>
      <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
        <p>{seconds}</p>
        <span>secs</span>
      </div>
    </div>
  );
}

function calculateRemainingTime(endTime) {
    const thirtyDays = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    const diff = Math.max(new Date(endTime).getTime() + thirtyDays - new Date().getTime(), 0);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }
  

export default CountdownTimer;
