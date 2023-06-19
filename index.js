const fetchData = async (searchTerm) => {
  //axios gives us a very neat way to add prameters to the URLs, as objects
  // s refers to search //s:"avengers",

  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "52b1d648",
      s: searchTerm,
    },
  });
  console.log(response.data);
};

const input = document.querySelector("input");

let timeoutId;

const onInput = (event) => {
  //the first time around this timerId is not defined so we will skip the code
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  //this to be defined it will need to wait the 1 second
  //adjusting the the time waited to make the search faster
  timeoutId = setTimeout(() => {
    fetchData(event.target.value);
  }, 1000);
};

input.addEventListener("input", onInput);
