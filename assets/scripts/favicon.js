function favicon() {
  const cycle_enabled = true;

  if (cycle_enabled) {
    const favicons = [
      "/assets/hearts/rainbow.webp",
      "/assets/hearts/trans.webp",
      "/assets/hearts/lesbian.webp",
      "/assets/hearts/bi.webp",
      "/assets/hearts/sapphic.webp",
    ];
    let index = 0;

    function changeFavicon() {
      let link = document.querySelector("link[rel='icon']") || document.createElement("link");
      link.rel = "icon";
      link.href = favicons[index];
      document.head.appendChild(link);
      index = (index + 1) % favicons.length;
    }

    changeFavicon();

    setInterval(changeFavicon, 10000);
  }
};

window.onload = function () {
  favicon();
}
