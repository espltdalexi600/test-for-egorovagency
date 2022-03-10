class Timer {
  constructor(deadline) {
    this.deadline = deadline
  }

  getTimeToDeadLine() {
    const timeToDeadline = this.deadline - new Date()

    const days = Math.floor(timeToDeadline / 86400000)
    const hours = Math.floor((timeToDeadline - days * 86400000) / 3600000)
    const minutes = Math.floor(
      (timeToDeadline - days * 86400000 - hours * 3600000) / 60000,
    )
    const seconds = Math.floor(
      (timeToDeadline - days * 86400000 - hours * 3600000 - minutes * 60000) /
        1000,
    )

    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }

  isOver() {
    return this.deadline - new Date() <= 0 ? true : false
  }
}

function startTimer(deadline, listerers) {
  const timer = new Timer(deadline)

  function updateTimer(timer, listerers) {
    if (timer.isOver()) {
      clearInterval(intervalId)
      return
    }

    const time = timer.getTimeToDeadLine()

    for (key in listerers) {
      listerers[key].forEach((item) => {
        item.textContent = time[key] < 10 ? `0${time[key]}` : `${time[key]}`
      })
    }
  }

  let intervalId = setInterval(updateTimer, 1000, timer, listerers)

  updateTimer(timer, listerers)
}

const listerers = {}
const days = document.querySelectorAll('[class*=timer__number--days]')
const hours = document.querySelectorAll('[class*=timer__number--hours]')
const minutes = document.querySelectorAll('[class*=timer__number--minutes]')
const seconds = document.querySelectorAll('[class*=timer__number--seconds]')

if (days.length) listerers.days = days
if (hours.length) listerers.hours = hours
if (minutes.length) listerers.minutes = minutes
if (seconds.length) listerers.seconds = seconds

startTimer(new Date(2022, 11, 31), listerers)
