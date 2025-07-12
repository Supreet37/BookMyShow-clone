const banner = document.getElementById("banner");
const leftArrow = document.querySelector(".banner-arrow.left");
const rightArrow = document.querySelector(".banner-arrow.right");

const scrollStep = 1000;

leftArrow.onclick = () => {
  banner.scrollLeft -= scrollStep;
};

rightArrow.onclick = () => {
  banner.scrollLeft += scrollStep;
};

setInterval(() => {
  if (banner.scrollLeft + banner.clientWidth >= banner.scrollWidth - 1) {
    banner.scrollLeft = 0;
  } else {
    banner.scrollLeft += scrollStep;
  }
}, 1000);

document.querySelectorAll("section").forEach(section => {
  const scrollBox = section.querySelector(".container") || section.querySelector(".event-list");
  const leftArrow = section.querySelector(".arrow-left");
  const rightArrow = section.querySelector(".arrow-right");

  const step = 300;

  if (scrollBox && leftArrow) {
    leftArrow.addEventListener("click", () => {
      scrollBox.scrollLeft -= step;
    });
  }

  if (scrollBox && rightArrow) {
    rightArrow.addEventListener("click", () => {
      scrollBox.scrollLeft += step;
    });
  }
});


const modal = document.getElementById("signinModal");
  const signBtn = document.getElementById("openModalBtn");

  function openSigninModal() {
    modal.style.display = "flex";
  }

  function closeSigninModal() {
    modal.style.display = "none";
  }

  function dummyLogin() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && password) {
      alert(`Welcome, ${username}!`);
      modal.style.display = "none";
    } else {
      alert("Please enter both username and password.");
    }
  }

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });


  const input = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  const scrollMap = {
    "movies": ".movies",
    "music": ".music",
    "events": ".events",
    "sports": ".sports",
    "plays": ".plays",
    "shows": ".shows",
    "concerts": ".concerts",
    "activities": ".activities",
    "outdoor": ".outdoor-events",
    "streams": ".streams"
  };
  

  function scrollToSection(e) {
    e.preventDefault(); 
  
    const keyword = input.value.trim().toLowerCase();
    const selector = scrollMap[keyword];
  
    if (selector) {
      const section = document.querySelector(selector);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        input.value="";
      }
    } 
    else {
      alert('No matching section found.');
    }
  }
  
  function handleEnterKey(e) {
    if (e.key === 'Enter') {
      scrollToSection(e);
    }
  }
  
  input.addEventListener('keypress', handleEnterKey);
  searchBtn.addEventListener('click', scrollToSection);
  


  const theaters = [
    { id: 1, name: "PVR Phoenix Mills", location: "Lower Parel" },
    { id: 2, name: "INOX Megaplex", location: "Inorbit Mall" },
    { id: 3, name: "Cinepolis Fun Republic", location: "Andheri West" },
    { id: 4, name: "PVR Icon", location: "Versova" }
  ];
  
  const showtimes = ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM", "11:00 PM"];
  
  let selectedMovie = null;
  let selectedTheater = null;
  let selectedShowtime = null;
  let selectedSeats = [];
  let seatPrice = 250;
  let ticketQuantity = 1;
  

  document.querySelectorAll('.movie-list').forEach((el) => {
    el.addEventListener('click', () => {
      const dummyMovie = {
        title: el.querySelector('h3').textContent,
        duration: "120 min",
        language: "Hindi",
        rating: 7.5,
        description: el.querySelector('p')?.textContent || "No description"
      };
      openBookingModal(dummyMovie);
    });
  });
  
  function openBookingModal(movie) {
    selectedMovie = movie;
    document.getElementById('modalMovieTitle').textContent = movie.title;
    document.getElementById('bookingModal').style.display = 'flex';
    displayTheaters();
    resetBooking();
  }
  
  function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
    resetBooking();
  }
  
  function resetBooking() {
    selectedTheater = null;
    selectedShowtime = null;
    selectedSeats = [];
    ticketQuantity = 1;
    document.getElementById('seatSection').style.display = 'none';
    document.getElementById('bookingSummary').style.display = 'none';
    updateUI();
  }
  
  function displayTheaters() {
    const grid = document.getElementById('theatersGrid');
    grid.innerHTML = '';
    theaters.forEach(theater => {
      const card = document.createElement('div');
      card.className = 'theater-card';
      card.innerHTML = `<strong>${theater.name}</strong><div style="font-size: 0.9em; color: #666;">${theater.location}</div>`;
      card.onclick = () => selectTheater(card, theater);
      grid.appendChild(card);
    });
  }
  
  function selectTheater(card, theater) {
    selectedTheater = theater;
    document.querySelectorAll('.theater-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    displayShowtimes();
  }
  
  function displayShowtimes() {
    const container = document.getElementById('showtimes');
    container.innerHTML = '';
    showtimes.forEach(time => {
      const btn = document.createElement('button');
      btn.className = 'showtime-btn';
      btn.textContent = time;
      btn.onclick = () => selectShowtime(btn, time);
      container.appendChild(btn);
    });
  }
  
  function selectShowtime(btn, time) {
    selectedShowtime = time;
    document.querySelectorAll('.showtime-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    displaySeats();
  }
  
  function displaySeats() {
    document.getElementById('seatSection').style.display = 'block';
    const container = document.getElementById('seatsContainer');
    container.innerHTML = '';
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 4; col++) {
        const seat = document.createElement('div');
        const seatNumber = `${String.fromCharCode(65 + row)}${col + 1}`;
        seat.className = 'seat available';
        seat.textContent = seatNumber;
        seat.dataset.seat = seatNumber;
        if (Math.random() < 0.3) {
          seat.className = 'seat occupied';
        } else {
          seat.onclick = () => toggleSeat(seat);
        }
        container.appendChild(seat);
      }
    }
  }
  
  function toggleSeat(seat) {
    const seatNumber = seat.dataset.seat;
    if (selectedSeats.includes(seatNumber)) {
      selectedSeats = selectedSeats.filter(s => s !== seatNumber);
      seat.classList.remove('selected');
      seat.classList.add('available');
    } else {
      if (selectedSeats.length < 10) {
        selectedSeats.push(seatNumber);
        seat.classList.remove('available');
        seat.classList.add('selected');
      }
    }
    updateBookingSummary();
  }
  

   ticketQuantity = 1;

  function adjustTickets(change) {
    ticketQuantity += change;
  
    if (ticketQuantity < 1) ticketQuantity = 1;
    if (ticketQuantity > selectedSeats.length) {
      ticketQuantity = selectedSeats.length;
      alert("You cannot book more tickets than selected seats.");
    }
  
    document.getElementById('ticketCount').textContent = ticketQuantity;
    updateBookingSummary(); 
  }

  function updateBookingSummary() {
    if (selectedSeats.length > 0) {
      document.getElementById('bookingSummary').style.display = 'block';
  
      if (ticketQuantity > selectedSeats.length) {
        ticketQuantity = selectedSeats.length;
        document.getElementById('ticketCount').textContent = ticketQuantity;
      }
  
      const totalAmount = ticketQuantity * seatPrice;
  
      document.getElementById('summaryDetails').innerHTML = `
        <div><strong>Movie:</strong> ${selectedMovie.title}</div>
        <div><strong>Theater:</strong> ${selectedTheater?.name || "Not selected"}</div>
        <div><strong>Showtime:</strong> ${selectedShowtime || "Not selected"}</div>
        <div><strong>Seats:</strong> ${selectedSeats.join(', ')}</div>
        <div><strong>Tickets:</strong> ${ticketQuantity} × ₹${seatPrice}</div>
      `;
  
      document.getElementById('totalAmount').textContent = totalAmount;
    } else {
      document.getElementById('bookingSummary').style.display = 'none';
    }
  }
  
  
  function confirmBooking() {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat!');
      return;
    }
    alert(`🎉 Booking Confirmed!\n\nMovie: ${selectedMovie.title}\nTheater: ${selectedTheater.name}\nShowtime: ${selectedShowtime}\nSeats: ${selectedSeats.join(', ')}\nTickets: ${ticketQuantity}\nTotal: ₹${ticketQuantity * seatPrice}`);
    closeModal();
  }
  
  window.onclick = function (e) {
    const modal = document.getElementById('bookingModal');
    if (e.target === modal) {
      closeModal();
    }
  };
  
  function updateUI() {}
  