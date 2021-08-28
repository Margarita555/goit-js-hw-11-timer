const daysFace = document.querySelector('span[data-value="days"]');
const hoursFace = document.querySelector('span[data-value="hours"]');
const minsFace = document.querySelector('span[data-value="mins"]');
const secsFace = document.querySelector('span[data-value="secs"]');

class CountdownTimer{
    constructor({ onTick, targetDate,selector }) {
        this.targetDate = targetDate.getTime();
        this.intervalId = null;
        this.onTick = onTick;
        this.selector = selector;
    }
    start() {
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const time = this.targetDate - currentTime;
            const timeComponents = this.getTimeComponents(time);
            this.onTick(timeComponents);

            if (time < 0) {
            clearInterval(this.intervalId);
            document.querySelector(this.selector).innerHTML = "expired";
            }
        },1000)
    }
   
    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return{days, hours, mins, secs}
    }
    pad(value) {
        return String(value).padStart(2, '0');
    }   
}

const newCountDownTimer = new CountdownTimer({
  onTick: updateClockface,
  selector: '#timer-1',
  targetDate: new Date('Dec 17, 2021'),
});

document.addEventListener("DOMContentLoaded", newCountDownTimer.start.bind(newCountDownTimer));

function updateClockface({ days, hours, mins, secs }) {
    daysFace.textContent = `${days}`;
    hoursFace.textContent = `${hours}`;
    minsFace.textContent = `${mins}`;
    secsFace.textContent = `${secs}`;
}
