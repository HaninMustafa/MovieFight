const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  //element that the autocompleteshouold be rendered into
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  //function that get invoked when a user clickesan option
  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    //Handelling empty responses
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return; // to prevent the function from running extra codes
    }
    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      //Handling item selection
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        //making a follow up request
        onOptionSelect(item);
      });
      resultsWrapper.appendChild(option);
    }
  };

  input.addEventListener("input", debounce(onInput, 500));

  //automatically closing the dropdown
  document.addEventListener("click", (event) => {
    //   console.log(event.target);
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
