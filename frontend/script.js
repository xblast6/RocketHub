const btnMenu = document.getElementById("btnMenu")
const menuSection = document.getElementById("menuSection")
const navButtons = document.querySelectorAll(".container-navbar");

const ULR_BASE = "http://localhost:5010"
const URL_COUNTDOWN = ULR_BASE + "/countdowns"

btnMenu.addEventListener("click", () => {
    menuSection.classList.toggle("aperto")
})

window.addEventListener("scroll", () => {
  const scrolledBeyond300 = window.scrollY > 300;
  navButtons.forEach(btnNav => {
    btnNav.classList.toggle("white", scrolledBeyond300);
  });
});

function countdownDifferenceTime(dateString) {
    const date = new Date(dateString)

    let daySpan = document.getElementById("days")
    let hoursSpan = document.getElementById("hours")
    let minutesSpan = document.getElementById("minutes")
    let secondSpan = document.getElementById("seconds")

    function differenceTime() {
        const now = new Date();
        const difference = date - now

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60); 

        countdown.textContent = 
        `${days}D ` +
        `${hours}H ` +
        `${minutes}M ` + 
        `${seconds}S`
    }

    differenceTime()
    const intervalId = setInterval(differenceTime, 1000);
}

function fetchNextCountdown() {
    fetch(URL_COUNTDOWN + "/nextCountdown")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        renderNextCountdown(data)
    })
    .catch(err => console.log("Errore: ", err))
}

function renderNextCountdown(data) {
    countdownDifferenceTime(data.launchDate)
}

fetchNextCountdown()

const navLinks = Array.from(document.querySelectorAll('.container-navbar a'))
  .filter(a => a.getAttribute('href') !== 'login.html');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const token = localStorage.getItem('token');
    if (!token) {
      e.preventDefault();
      window.location.href = 'login.html';
    }
  });
});

const countdownEl = document.getElementById("countdown");
if (countdownEl) {
  window.addEventListener("DOMContentLoaded", () => {
    fetchNextCountdown();
  });
}
