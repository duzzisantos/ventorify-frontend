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
