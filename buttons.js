const graph = document.getElementById("graph");
const left = document.getElementById("left");
const right = document.getElementById("right");

left.addEventListener("click", () => {
  graph.scrollLeft -= graph.clientWidth;
});

right.addEventListener("click", () => {
  graph.scrollLeft += graph.clientWidth;
});
