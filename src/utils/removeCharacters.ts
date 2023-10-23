const removeCharacters = (text: string) => {
  const regex =
    /(\$[0-9a-fA-F]{3})|(\$[wWtTzZiIoOsSgGnNmM])|(\$[hHlL](\[\d+\])?)/g;

  return text.replace(regex, "").toLocaleUpperCase();
};

export default removeCharacters;
