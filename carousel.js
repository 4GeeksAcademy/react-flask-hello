const events = [
  { icon: "🎵", title: "Concert Night", date: "Sep 10, 2025", rsvp: 42 },
  { icon: "🍴", title: "Foodie Meetup", date: "Sep 15, 2025", rsvp: 28 },
  { icon: "💻", title: "Tech Hackathon", date: "Sep 20, 2025", rsvp: 65 },
];

let current = 0;

function updateCarousel() {
  const card = document.getElementById("carousel-card");
  card.innerHTML = `
    <span class="event-icon">${events[current].icon}</span>
    <h4>${events[current].title}</h4>
    <p>${events[current].date} • ${events[current].rsvp} RSVPs</p>
  `;
}

document.getElementById("carousel-prev").onclick = function () {
  current = (current - 1 + events.length) % events.length;
  updateCarousel();
};
document.getElementById("carousel-next").onclick = function () {
  current = (current + 1) % events.length;
  updateCarousel();
};

updateCarousel();
