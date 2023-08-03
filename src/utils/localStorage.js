export const loadState = () => {
  try {
    const data = localStorage.getItem('hometown-store');
    if (data === null) return undefined;
    return JSON.parse(data);
  } catch (error) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const data = JSON.stringify(state);
    localStorage.setItem('hometown-store', data);
  } catch (error) {
    return undefined;
  }
};
