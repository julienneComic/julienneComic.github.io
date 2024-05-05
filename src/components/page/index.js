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
    <a id="first-page" href="./?view=page&page=1"><<</a>
    <a id="previous-page" href="./?view=page&page=2"><</a>
    <p id="page-number"></p>
    <a id="next-page" href="./?view=page&page=3">></a>
    <a id="last-page" href="./?view=page&page=93">>></a>
  </div>
</content>
`;
  }
}
customElements.define("page-component", Page);
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
const setupPageView = async (page) => {
  d.getElementById("loading")?.classList.add("loading");
  setButtonsDisabled(true);
  handlePageCleanup();
  const image = d.getElementById("page-image");
  if (image) {
    image.src = "";
  }
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
  d.getElementById("previous-page").href =
    `./?view=page&page=${Number(page) - 1}`;
  d.getElementById("next-page").href = `./?view=page&page=${Number(page) + 1}`;
  d.getElementById("page-number").textContent = page;
};

let page = getQueryValue("page");
if (!page) {
  page = 1;
  setQueryValue("page", 1);
}

setupPageView(page);

console.log("page view finished");
