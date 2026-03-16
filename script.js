// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);
reveals.forEach((el) => observer.observe(el));

// Species filter
function filterSpecies(filter, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".sp-card").forEach((card) => {
    const k = card.dataset.kingdom;
    const m = card.dataset.mod;
    let show = false;
    if (filter === "all") show = true;
    else if (filter === "fungus") show = k === "fungus";
    else if (filter === "bacteria") show = k === "bacteria";
    else if (filter === "modified") show = m === "modified";
    else if (filter === "wildtype") show = m === "wildtype";
    card.style.display = show ? "" : "none";
  });
}

// Nav logo crossfade toggle (mobile)
function toggleNavLogo() {
  if (window.innerWidth <= 700) {
    document.getElementById("navLogo").classList.toggle("flipped");
  }
}

// Nav overflow → dropdown
const navLinksList = document.querySelector(".nav-links");
const navDropdown = document.getElementById("navDropdown");
const nav = document.querySelector("nav");

function checkNavOverflow() {
  // Temporarily force links visible to measure them
  navLinksList.style.display = "flex";
  navDropdown.style.display = "none";

  const navRight = nav.getBoundingClientRect().right;
  const linksRight = navLinksList.getBoundingClientRect().right;

  if (linksRight > navRight - 8) {
    navLinksList.style.display = "none";
    navDropdown.style.display = "block";
  }
}

function toggleDropdown() {
  document.getElementById("navDropdownMenu").classList.toggle("open");
}

function closeDropdown() {
  document.getElementById("navDropdownMenu").classList.remove("open");
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (navDropdown && !navDropdown.contains(e.target)) closeDropdown();
});

checkNavOverflow();
window.addEventListener("resize", checkNavOverflow);

// Scroll active state — targets both link sets
window.addEventListener("scroll", () => {
  let current = "";
  document.querySelectorAll("section[id]").forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  document
    .querySelectorAll(".nav-links a, .nav-dropdown-menu a")
    .forEach((a) => {
      a.style.color =
        a.getAttribute("href") === "#" + current
          ? "var(--gl)"
          : "rgba(255,255,255,0.55)";
    });
});
