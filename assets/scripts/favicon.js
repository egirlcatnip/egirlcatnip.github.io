const favicons = [
  "/assets/img/hearts/rainbow.webp",
  "/assets/img/hearts/trans.webp",
  "/assets/img/hearts/lesbian.webp",
  "/assets/img/hearts/bisexual.webp",
  "/assets/img/hearts/sapphic.webp",
];
let index = 0;

function changeFavicon() {
  const link = document.querySelector("link[rel='icon']") ||
    document.createElement("link");
  link.rel = "icon";
  link.href = favicons[index];
  document.head.appendChild(link);
  index = (index + 1) % favicons.length;
}

function favicon() {
  const cycle_enabled = true;

  if (cycle_enabled) {
    changeFavicon();
    setInterval(changeFavicon, 10000);
  }
}
