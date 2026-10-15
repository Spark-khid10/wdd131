// Shared footer logic: current year and last modified date.
// Included on every page of the site.
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;