export const generateRandomId = (len = 8) => {

  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let length = len;
  let id = '';
  while(length--) {
    id += chars[Math.random() * chars.length | 0]
  }
  return id;
}

export const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

