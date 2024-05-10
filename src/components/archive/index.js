class Archive extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
content {
  margin: 28px auto;
  max-width: 981px;
  padding: 20px 0;
  display: block;
}
content h2 {
  padding: 0px 20px 20px 20px;
}
content details {
  background-color: #d0fffe;
  margin: 16px;
  padding-bottom: 20px;
}
content summary {
  display: block;
  curosr: pointer;
  padding: 20px 20px 0 20px;
}
content ul {
  display: flex;
  flex-wrap: wrap;
}
content li {
  width: 80px;
  padding: 8px;
  margin: 8px;
  text-align: center;
  background-color: #b1f9f9;
  transition: background-color 250ms;
}
content li:hover {
  background-color: white;
}
a:link    {color:#000;}  /* unvisited link  */
a:visited {color:#000;}  /* visited link    */
a:hover   {color:#000;}  /* mouse over link */
a:active  {color:#000;} 
</style>
<content id="content">
  <h2>Archive</h2>
</content>
`;
  }
}

customElements.define("archive-component", Archive);
const setupArchivePage = async () => {
  const content = document.getElementById("content");
  const response = await fetch(`./src/data/archive.json`);
  const body = await response.json();
  class ArchiveRow extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = `
<style>
</style>
  <details>
    <summary><h3></h3></summary>
    <ul></ul>
  </details>
  `;
    }
  }
  customElements.define("archive-row-component", ArchiveRow);
  let postNumber = 1;
  const chapterNumbers = Object.keys(body);
  for (const chapterNumber of chapterNumbers) {
    content.insertAdjacentHTML(
      "beforeend",
      `
<archive-row-component id="chapter-${chapterNumber}"></archive-row-component>
`,
    );
    console.log(document.getElementById(`chapter-${chapterNumber}`));
    const [summary, pageChildren] = document
      .getElementById(`chapter-${chapterNumber}`)
      .getElementsByTagName("details")[0].children;
    // console.log(details);
    // const summary = details.firstChild;
    // const pageChildren = details.lastChild;
    summary.children[0].innerText = `Chapter ${chapterNumber}`;
    for (const pageNumber of body[chapterNumber]) {
      pageChildren.insertAdjacentHTML(
        "beforeend",
        `
<li>
  <a href="./?view=page&page=${postNumber}">Page ${pageNumber}</a>
</li>
`,
      );
      postNumber += 1;
    }
  }
};

setupArchivePage();
