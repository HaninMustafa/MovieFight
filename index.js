const fetchData = async (searchTerm) => {
  //axios gives us a very neat way to add prameters to the URLs, as objects
  // s refers to search //s:"avengers",

  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "52b1d648",
      s: searchTerm,
    },
  });
  return response.data.Search;
};
const input = document.querySelector("input");

//easy to read onInput function
// const onInput = debounce((event) => {
//   fetchData(event.target.value);
// });
// input.addEventListener("input", onInput);
//a different way of doing it

const onInput = async (event) => {
  //
  const movies = await fetchData(event.target.value);

  for (let movie of movies) {
    const div = document.createElement("div");
    div.innerHTML = `
    <img src="${movie.Poster}" />
    <h1>${movie.Title}</h1>
    `;
    document.querySelector("#target").appendChild(div);
  }
};

input.addEventListener("input", debounce(onInput, 500));
