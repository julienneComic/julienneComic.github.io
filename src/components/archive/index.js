class Archive extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
section {
  margin: 28px auto;
  max-width: 981px;
  padding: 20px 0;
  display: block;
}
section h2 {
  padding: 0px 20px 20px 20px;
}
section details {
  background-color: #d0fffe;
  margin: 16px;
  padding-bottom: 20px;
}
section summary {
  display: block;
  curosr: pointer;
  padding: 20px 20px 0 20px;
}
section ul {
  display: flex;
  flex-wrap: wrap;
}
section li {
  width: 80px;
  padding: 8px;
  margin: 8px;
  text-align: center;
  background-color: #b1f9f9;
  transition: background-color 250ms;
}
section li:hover {
  background-color: white;
}
section h3 {
  font-size: 28px;
}
a:link    {color:#000;}  /* unvisited link  */
a:visited {color:#000;}  /* visited link    */
a:hover   {color:#000;}  /* mouse over link */
a:active  {color:#000;} 
</style>
<section id="content">
  <h2>Archive</h2>
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
  const response = await fetch(`./src/data/archive.json`);
  const body = await response.json();

  let postNumber = 1;
  const chapterNumbers = Object.keys(body);
  // loop through all the chapters create a details summary group for each
  for (const chapterNumber of chapterNumbers) {
    content.insertAdjacentHTML(
      "beforeend",
      `
<archive-row-component id="chapter-${chapterNumber}"></archive-row-component>
`,
    );
    const [summary, pageChildren] = document
      .getElementById(`chapter-${chapterNumber}`)
      .getElementsByTagName("details")[0].children;
    summary.children[0].innerText = `Chapter ${chapterNumber}: ${body[chapterNumber].title}`;

    // loop through all the chapterNumbers
    for (const pageNumber of body[chapterNumber].pages) {
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
