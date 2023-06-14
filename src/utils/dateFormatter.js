const dateFormatter = (date) => {
  let newDate = new Date(date);
  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(newDate);
  let month = new Intl.DateTimeFormat("en", { month: "short" }).format(newDate);
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(newDate);

  return `${day}-${month}-${year}`;
};

export default dateFormatter;
