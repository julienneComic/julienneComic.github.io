const data = require("./data.json");
class Page extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
page-component {
  display: flex;
}
  content {
    display: block;
    width: 100%;
    margin: 0 auto;
    font-size: 20px;
    background-color: white;
    max-width: 900px;
  }
  content h3 {
    font-size: 24px;
    text-decoration: underline;
  }
  content .description {
    padding: 20px 0 0 0;
    width: 100%;
    background-color: #91cff4;
  }
  content .description div {
    box-sizing: border-box;
    border: black 2px solid;
    width: 70%;
    margin: 0 auto;
    background-color: #dbf2ff;
    padding: 4px 4px 8px 4px;
  }
  @media all and (max-width: 890px) {
    content .description div {
      width: 95%;
    }
  }

  content .description p {
    padding-left: 16px;
  }
  .description ul li {
    list-style-type: disc;
  }
  content .description h3 {
    padding-bottom: 4px;
  }
  content nav {
    display: flex;
    margin: 0 auto;
    margin-bottom: 40px;
    width: 80%;
    padding: 0 20px;
    justify-content: space-around;
    align-items: center;
    max-width: 900px;
    padding: 0 20px;
  }
  #page_nav_divider {
    height: 50px;
  }
  content nav a { 
      text-decoration: none;
      color: black;
  }
  content nav img {
    height: 80px;
  }
  content a {
    cursor: pointer;
    background-color: white;
    font-size: 24px;
    border-radius: 10px;
    transition: color 250ms ease, background-color 250ms ease;
  }
  content a:disabled {
    background-color: lightgrey;
    cursor: unset;
    color: white;
  }
  content img#page-image {
    padding: 40px 20px;
    margin: 0 auto;
    width: 90%;
    display: block;
    transition: height ease 250ms;
    min-height: 66vh;
  }

  @media all and (max-width: 890px) {
    content img#page-image {
      padding: 0;
      width: 100%;
    }
  }
</style>
<content>
  <a id="image-next-page" href="./?view=pages&page=3" >
    <img id="page-image" src="" />
  </a>
  <nav id="page-nav" >
    <a id="first-page" aria-label="first page" href="./?view=pages&page=1">
      <img src="./page_nav_first.png" />
    </a>
    <a id="previous-page" aria-label="previous page" href="./?view=pages&page=2">
      <img src="./page_nav_prev.png" />
    </a>
    <a href="./?view=archive" ><img id="page_nav_divider" src="./page_nav_divider.png" /></a>
    <a id="next-page" aria-label="next page" href="./?view=pages&page=3">
      <img src="./page_nav_next.png" />
    </a>
    <a id="last-page" aria-label="last page" href="./?view=pages&page=${data.lastPage}">
      <img src="./page_nav_last.png" />
    </a>
  </nav>
</content>
`;
  }
}

customElements.define("page-component", Page);

const setupPageView = async (page) => {
  // make sure users can't interact with the buttons before the new values have been set
  d.getElementById("loading")?.classList.add("loading");

  if (
    document.referrer &&
    new URL(document.referrer).searchParams.get("page")
  ) {
    location.hash = "page-image";
  }
  const response = await fetch(`./page_${page}.json`);
  if (response.status !== 200) console.warn("Page data can't be loaded");
  const pageData = await response.json();
  document.getElementById("loading")?.classList.remove("loading");
  document.getElementById("page-image").src = pageData.image;

  if (pageData.description) {
    console.log(pageData.description)
    const descriptionElement = document.createElement("div");
    descriptionElement.innerHTML = "<div>" + pageData.description + "</div>";
    descriptionElement.classList.add("description");
    document
      .getElementById("page-nav")
      .insertAdjacentElement("afterend", descriptionElement);
  }

  document.getElementById("previous-page").href =
    `./?view=pages&page=${Number(page) - 1}`;
  document.getElementById("next-page").href =
    `./?view=pages&page=${Number(page) + 1}`;
  document.getElementById("image-next-page").href =
    `./?view=pages&page=${Number(page) + 1}`;
  // document.getElementById("page-number").textContent = page;

  if (Number(page) < 2) {
    document.getElementById("first-page").herf = "";
    document.getElementById("previous-page").href = "";
  }

  if (!(Number(page) < data.lastPage)) {
    console.log(document.getElementById("next-page"))
    document.getElementById("next-page").href = "";
    document.getElementById("last-page").href = "";
  }
};

let page = getQueryValue("page");
if (!page) {
  page = 1;
  setQueryValue("page", 1);
}
setupPageView(page);
console.log("page script finished");
