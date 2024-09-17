const pageData = require("./data.json");

class Archive extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
archive-component {
  margin: 0 auto;
  max-width: 900px;
  padding: 20px 0;
  display: block;
  background-color: #dbf2ff;
}
archive-component h2 {
  padding: 0px 20px 4px 20px;
  font-size: 36px;
}
archive-component details {
  background-color: #c3e3ff;
  margin: 16px;
  padding-bottom: 20px;
}
archive-component summary {
  display: block;
  cursor: pointer;
  padding: 20px 20px 0 20px;
}
archive-component ul {
  display: flex;
  flex-wrap: wrap;
}
archive-component li {
  width: 80px;
  padding: 8px;
  margin: 8px;
  text-align: center;
  background-color: #a5d4fe;
  transition: background-color 250ms;
}
archive-component li:hover {
  background-color: white;
}
archive-component h3 {
  font-size: 28px;
}
a:link    {color:#000;}  /* unvisited link  */
a:visited {color:#000;}  /* visited link    */
a:hover   {color:#000;}  /* mouse over link */
a:active  {color:#000;} 
</style>
<section id="content">
  <h2>Volume 1</h2>
</section>
`;
  }
}

customElements.define("archive-component", Archive);

class ArchiveRow extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<details>
  <summary><h3></h3></summary>
  <ul></ul>
</details>
  `;
  }
}

customElements.define("archive-row-component", ArchiveRow);

const setupArchivePage = async () => {
  const content = document.getElementById("content");

  let postNumber = 1;
  let chapterOffset = 0;
  // loop through all the chapters create a details summary group for each
  for (let i = 0; i < pageData.chapters.length; i += 1) {
    if (i === 5) {
      content.insertAdjacentHTML("beforeend", 
"<h2>Volume 2</h2>"
      );
      chapterOffset = 5;
    }
    const chapterNumber = i + 1;
    const visibileChapterNumber = chapterNumber - chapterOffset;
    const chapterData = pageData.chapters[i];
    content.insertAdjacentHTML(
      "beforeend",
      `
<archive-row-component id="chapter-${chapterNumber}"></archive-row-component>
`,
    );
    const [summary, pageChildren] = document
      .getElementById(`chapter-${chapterNumber}`)
      .getElementsByTagName("details")[0].children;
    summary.children[0].innerText = `Chapter ${visibileChapterNumber}: ${chapterData.title}`;

    // loop through all the chapterNumbers
    for (const pageNumber of chapterData.pages) {
      pageChildren.insertAdjacentHTML(
        "beforeend",
        `
<li>
  <a href="./?view=pages&page=${postNumber}">Page ${pageNumber}</a>
</li>
`,
      );
      postNumber += 1;
    }
  }
};
window.addEventListener("load", setupArchivePage);
