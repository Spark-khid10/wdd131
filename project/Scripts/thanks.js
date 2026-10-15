function readParams(ids) {
  const params = new URLSearchParams(window.location.search);
  const categoryNames = {
    "html-css": "HTML & CSS",
    javascript: "JavaScript",
    tools: "Tools & Workflow",
    community: "Community & Career",
    other: "Other",
  };

  document.getElementById(ids.name).textContent =
    params.get("resource-name") || "Not provided";

  document.getElementById(ids.url).textContent =
    params.get("resource-url") || "Not provided";

  const category = params.get("category");
  document.getElementById(ids.category).textContent = category
    ? categoryNames[category] || category
    : "Not provided";

  document.getElementById(ids.why).textContent =
    params.get("why-useful") || "No reason given.";

  document.getElementById(ids.suggester).textContent =
    params.get("suggester-name") || "Anonymous";
}

readParams({
  name: "summary-name",
  url: "summary-url",
  category: "summary-category",
  why: "summary-why",
  suggester: "summary-suggester",
});