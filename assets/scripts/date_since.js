function dateSince({
  from,
  to,
  options = {},
} = {}) {
  // Validate input
  if (!from || !from.year || !from.month || !from.day) {
    throw new Error("From date must be fully specified");
  }

  // Use current date if 'to' is not specified
  const today = new Date();
  const toDate = to
    ? new Date(to.year, (to.month || 1) - 1, to.day || 1)
    : today;

  const fromDate = new Date(from.year, (from.month || 1) - 1, from.day || 1);

  // Calculate difference in milliseconds
  const diffMs = toDate.getTime() - fromDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Calculate years, months, weeks, and days
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const weeks = Math.floor(((totalDays % 365) % 30) / 7);
  const days = ((totalDays % 365) % 30) % 7;

  // Rounding logic
  const { ago = false } = options;

  let text = "";
  let comment = "";

  // Determine comment text
  if (!to) {
    comment = fromDate.toDateString();
  } else {
    comment = `${(fromDate.toDateString())} - ${(toDate.toDateString())}`;
  }

  // Build the text output based on the calculated values
  const parts = [];
  if (years > 0) parts.push(`${years} year${years !== 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} month${months !== 1 ? "s" : ""}`);
  if (weeks > 0) parts.push(`${weeks} week${weeks !== 1 ? "s" : ""}`);
  if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);

  // Handle cases where counts are too small
  if (months === 0 && weeks === 0 && days < 7) {
    if (days > 0) {
      text = `${days} day${days !== 1 ? "s" : ""}`;
    } else {
      text = "less than a day";
    }
  } else {
    text = parts.join(" and ");
  }

  // Append "ago" or "from now" if applicable
  if (!to) {
    console.log({ to, today });
    if (ago) {
      text += " ago";
    } else if (totalDays < 0) {
      text += " from now";
    }
  }

  return { text, comment };
}

function applyDateSince({
  selector,
  from,
  to,
  options = {},
}) {
  // Find the target element
  const el = document.querySelector(selector);

  // If no element found, log a warning and return
  if (!el) {
    console.warn(`Element not found for selector: ${selector}`);
    return;
  }

  // Calculate the date difference
  const { text, comment } = dateSince({ from, to, options });

  // Apply to the element
  el.textContent = text;
  el.title = comment;

  // Return the result in case it's needed
  return { text, comment };
}
