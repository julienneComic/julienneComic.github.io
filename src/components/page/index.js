class Page extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
  content {
    max-width: 980px;
    display: block;
    width: 100%;
    margin: 0 auto;
    font-size: 24px;
  }
  content div {
    display: flex;
    margin: 0 auto;
    margin-bottom: 40px;
    width: 300px;
    justify-content: space-around;
  }
  content div a { 
      text-decoration: none;
      color: black;
  }
  content a {
    cursor: pointer;
    background-color: white;
    font-size: 24px;
    border-radius: 10px;
    transition: color 250ms ease, background-color 250ms ease;
  }
  content a:hover {
    background-color: rgb(37, 49, 141);
    color: white;
  }
  content a:disabled {
    background-color: lightgrey;
    cursor: unset;
    color: white;
  }
  content img {
    padding: 20px;
    margin: 20px auto;
    width: 80%;
    display: block;
    transition: height ease 250ms;
    min-height: 66vh;
  }

  @media all and (max-width: 890px) {
    content img {
      padding: 20px 5px;
      width: 95%;
    }
  }
</style>
<content>
  <img id="page-image" src="" />
  <div>
    <a id="first-page" href="./?view=pages&page=1"><<</a>
    <a id="previous-page" href="./?view=pages&page=2"><</a>
    <p id="page-number"></p>
    <a id="next-page" href="./?view=pages&page=3">></a>
    <a id="last-page" href="./?view=pages&page=93">>></a>
  </div>
</content>
`;
  }
}

customElements.define("page-component", Page);

/**
 * used to disable buttons as the page loads
 * @param {Boolean} disabled should the buttons be disabled
 */
const setButtonsDisabled = (disabled) => {
  const firstPage = document.getElementById("first-page");
  if (firstPage) {
    firstPage.disabled = disabled;
  }
  const previousPage = document.getElementById("previous-page");
  if (previousPage) {
    previousPage.disabled = disabled;
  }
  const nextPage = document.getElementById("next-page");
  if (nextPage) {
    nextPage.disabled = disabled;
  }
  const lastPage = document.getElementById("last-page");
  if (lastPage) {
    lastPage.disabled = disabled;
  }
};

const handleFirstPageClick = () => {
  setQueryValue("pages", 1);
  setupPageView(1);
};
const handlePreviousPageClick = () => {
  const newPage = Number(page) - 1;
  setQueryValue("pages", newPage);
  setupPageView(newPage);
};
const handleNextPageClick = () => {
  const newPage = Number(page) + 1;
  setQueryValue("pages", newPage);
  setupPageView(newPage);
};
const handleLastPageClick = () => {
  setQueryValue("pages", 1);
};

// remove event listeners to prevent memory leak
const handlePageCleanup = () => {
  if (document.getElementById("previousPage")) {
    document
      .getElementById("firstPage")
      .removeEventListener("click", handleFirstPageClick);
    document
      .getElementById("previousPage")
      .removeEventListener("click", handlePreviousPageClick);
    document
      .getElementById("nextPage")
      .removeEventListener("click", handleNextPageClick);
    document
      .getElementById("lastPage")
      .removeEventListener("click", handleLastPageClick);
  }
  const image = document.getElementById("page-image");
  if (image) {
    image.src = "";
  }
};
const setupPageView = async (page) => {
  // make sure users can't interact with the buttons before the new values have been set
  d.getElementById("loading")?.classList.add("loading");
  setButtonsDisabled(true);
  handlePageCleanup();
  if (
    document.referrer &&
    new URL(document.referrer).searchParams.get("page")
  ) {
    location.hash = "page-image";
  }
  const response = await fetch(`./page_${page}.json`);
  if (response.status !== 200) console.warn("Page data can't be loaded");
  const pageData = await response.json();
  setButtonsDisabled(false);
  document.getElementById("loading")?.classList.remove("loading");
  document.getElementById("page-image").src = pageData.image;
  if (pageData.text) {
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = pageData.text;
    descriptionElement.classList.add("description");
    document
      .getElomentByTagName("page-image")[0]
      .insertAdjacentElement("afterend", descriptionElement);
  }
  if (page < 2) {
    document.getElementById("first-page").disabled = true;
    document.getElementById("previous-page").disabled = true;
  } else {
    document.getElementById("first-page").disabled = false;
    document.getElementById("previous-page").disabled = false;
  }
  document.getElementById("previous-page").href =
    `./?view=pages&page=${Number(page) - 1}`;
  document.getElementById("next-page").href =
    `./?view=pages&page=${Number(page) + 1}`;
  document.getElementById("page-number").textContent = page;
};

let page = getQueryValue("page");
if (!page) {
  page = 1;
  setQueryValue("page", 1);
}
setupPageView(page);
console.log("page script finished");
