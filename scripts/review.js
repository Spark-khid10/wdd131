const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 },
];

function titleCase(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function productName(id) {
  const match = products.find((product) => product.id === id);
  return match ? titleCase(match.name) : "Unknown product";
}

const params = new URLSearchParams(window.location.search);

document.getElementById("summary-product").textContent = productName(params.get("product"));
document.getElementById("summary-rating").textContent = params.get("rating")
  ? `${params.get("rating")} / 5`
  : "Not provided";
document.getElementById("summary-date").textContent = params.get("install-date") || "Not provided";

const features = params.getAll("features");
document.getElementById("summary-features").textContent = features.length
  ? features.join(", ")
  : "None selected";

document.getElementById("summary-review").textContent = params.get("review") || "No written review submitted.";
document.getElementById("summary-name").textContent = params.get("username") || "Anonymous";

// Review counter, persisted across visits via localStorage
const reviewCount = (parseInt(localStorage.getItem("reviewCount"), 10) || 0) + 1;
localStorage.setItem("reviewCount", reviewCount);
document.getElementById("review-count").textContent = reviewCount;

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;