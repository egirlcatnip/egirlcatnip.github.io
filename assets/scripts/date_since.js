// deno-lint-ignore no-unused-vars
function applyDateSince(options) {
  let {
    class: className,
    date_from,
    date_to,
    units,
    prepend = [],
    append = [],
  } = options;

  const elements = document.querySelectorAll(`.${className}`);
  if (!elements.length) return;

  if (typeof date_from === "function") date_from = date_from("iso8601");
  if (typeof date_to === "function") date_to = date_to("iso8601");
  if (!date_to) {
    date_to = date_from.hour !== undefined
      ? Temporal.Now.plainDateTimeISO()
      : Temporal.Now.plainDateISO();
  }

  // Calculate difference
  const diffParts = [];
  let current = date_from;
  for (const unit of units) {
    const diff = current.until(date_to, { largestUnit: unit });
    const val = diff[`${unit}s`];

    if (val !== 0) {
      diffParts.push(`${val} ${unit}${val === 1 ? "" : "s"}`);
      current = current.add({ [`${unit}s`]: val });
    }
  }

  const diffString = diffParts.length === 0
    ? `0 ${units[units.length - 1]}s`
    : (diffParts.length === 1
      ? diffParts[0]
      : `${diffParts.slice(0, -1).join(", ")} and ${
        diffParts[diffParts.length - 1]
      }`);

  // Construct UI strings
  // prepend/append are expected as [diff_form, date_form]
  const pDiff = prepend[0] || "";
  const aDiff = append[0] || "";
  const pDate = prepend[1] || "";
  const aDate = append[1] || "";

  const displayDiff = `${pDiff} ${diffString} ${aDiff}`.replace(/\s+/g, " ")
    .trim();
  const displayDate = `${pDate} ${date_from.toString().split("T")[0]} ${aDate}`
    .replace(/\s+/g, " ").trim();

  elements.forEach((el) => {
    let showingDiff = true;
    el.style.display = "inline";
    el.style.cursor = "pointer";

    const updateState = () => {
      el.textContent = showingDiff ? displayDiff : displayDate;
      el.title = showingDiff ? displayDate : displayDiff;
    };

    updateState();
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showingDiff = !showingDiff;
      updateState();
    });
  });
}
