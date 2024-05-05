const d = document;
const w = window;

const getQueryValue = (query) => {
  const url = new URL(location);
  return url.searchParams.get(query);
};
const setQueryValue = (query, value) => {
  const url = new URL(location);
  url.searchParams.set(query, value);
  history.pushState({}, "", url);
};
const setButtonsDisabled = (disabled) => {
  const firstPage = d.getElementById("first-page");
  if (firstPage) {
    firstPage.disabled = disabled;
  }
  const previousPage = d.getElementById("previous-page");
  if (previousPage) {
    previousPage.disabled = disabled;
  }
  const nextPage = d.getElementById("next-page");
  if (nextPage) {
    nextPage.disabled = disabled;
  }
  const lastPage = d.getElementById("last-page");
  if (lastPage) {
    lastPage.disabled = disabled;
  }
};
const handleFirstPageClick = () => {
  setQueryValue("page", 1);
  setupPageView(1);
};
const handlePreviousPageClick = () => {
  const newPage = Number(page) - 1;
  setQueryValue("page", newPage);
  setupPageView(newPage);
};
const handleNextPageClick = () => {
  const newPage = Number(page) + 1;
  setQueryValue("page", newPage);
  setupPageView(newPage);
};
const handleLastPageClick = () => {
  setQueryValue("page", 1);
};
const handlePageCleanup = () => {
  if (d.getElementById("previousPage")) {
    d.getElementById("firstPage").removeEventListener(
      "click",
      handleFirstPageClick,
    );
    d.getElementById("previousPage").removeEventListener(
      "click",
      handlePreviousPageClick,
    );
    d.getElementById("nextPage").removeEventListener(
      "click",
      handleNextPageClick,
    );
    d.getElementById("lastPage").removeEventListener(
      "click",
      handleLastPageClick,
    );
  }
};
const setupPageView = async (newPage) => {
  d.getElementById("loading")?.classList.add("loading");
  setButtonsDisabled(true);
  handlePageCleanup();
  const image = d.getElementById("page-image");
  if (image) {
    image.src = "";
  }
  page = newPage;
  const response = await fetch(`./pages/page_${page}.json`);
  const pageData = await response.json();
  setButtonsDisabled(false);
  d.getElementById("loading")?.classList.remove("loading");
  d.getElementById("page-image").src = pageData.image;
  if (pageData.text) {
    const descriptionElement = d.createElement("p");
    descriptionElement.textContent = pageData.text;
    descriptionElement.classList.add("description");
    d.getElomentByTagName("page-image")[0].insertAdjacentElement(
      "afterend",
      descriptionElement,
    );
  }
  if (page < 2) {
    d.getElementById("first-page").disabled = true;
    d.getElementById("previous-page").disabled = true;
  } else {
    d.getElementById("first-page").disabled = false;
    d.getElementById("previous-page").disabled = false;
  }
  //remove these event listeners!
  d.getElementById("first-page").addEventListener(
    "click",
    handleFirstPageClick,
  );
  d.getElementById("previous-page").addEventListener(
    "click",
    handlePreviousPageClick,
  );
  d.getElementById("next-page").addEventListener("click", handleNextPageClick);
  d.getElementById("last-page").addEventListener("click", handleFirstPageClick);
  d.getElementById("page-number").textContent = page;
};
setupPageView(getQueryValue("page"));

window.addEventListener("locationchange", function (event) {
  console.log("location changed!,", event);
});
window.onhashchange = (event) => {
  console.log("stuff", event);
};
