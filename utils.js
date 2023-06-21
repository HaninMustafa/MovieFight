//func is the callback
const debounce = (func, delay = 1000) => {
  let timeoutId;
  // this function is the wrapper the little shield
  //we may many different aguments so instead of arg we use ...arg(s)
  return (...args) => {
    //the first time around this timerId is not defined so we will skip the code
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      //this below is equavelent to having func(arg1,arg2,arg3)
      func.apply(null, args);
    }, delay);
  };
};
