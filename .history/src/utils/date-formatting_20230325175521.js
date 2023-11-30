//Reusable Date and Time Formatters

export const customDateFormat = (date, language = "", zone) => {
  return new Date(date).toLocaleDateString(language, {
    timeZone: zone,
  });
};

export const customTimeFormat = (date, language = "", zone) => {
  return new Date(date).toLocaleTimeString(language, {
    timeZone: zone,
  });
};

export const preferredLanguage = () => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return navigator.userAgent || navigator.language;
  }
};

export const assignColorPerLevel = {
  high: "#22bb33",
  medium: "#f0ad4e",
  low: "#bb2124",
};
