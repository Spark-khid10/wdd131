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

const select = document.getElementById("product");

products.forEach((product) => {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = titleCase(product.name);
  select.appendChild(option);
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;