function calculateAge(day, month, year) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day); // Month is 0-based
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

function date_since({ selector, day, month, year }) {
  const today = new Date();
  const isBirthday = today.getDate() === day && today.getMonth() === month - 1;
  const age = calculateAge(day, month, year);
  const ageText = isBirthday ? `${age} (happy birthday!! 🎉)` : age;

  document.querySelectorAll(selector).forEach((el) => {
    el.textContent = ageText;
  });
}

