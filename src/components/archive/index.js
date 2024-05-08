class Archive extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
content {
  padding: 20px 0;
  display: block;
}
h2 {
  padding: 0px 20px 20px 20px;
}
details {
  padding: 20px;
}
</style>
<content id="content">
  <h2>Archive</h2>
</content>
`;
  }
}

customElements.define("about-component", Archive);
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
  <details>
  <summary></summary>
  <ul></ul>
  </details>
  `;
    }
  }
  customElements.define("archive-row-component", ArchiveRow);

  const chapterNumbers = Object.keys(body);
  for (const chapterNumber of chapterNumbers) {
    content.insertAdjacentHTML(
      "beforeend",
      `
<archive-row-component id="chapter-${chapterNumber}"></archive-row-component>
`,
    );
    const [summary, pageChildren] = document.getElementById(
      `chapter-${chapterNumber}`,
    ).children[0].children;
    summary.innerText = `Chapter ${chapterNumber}`;
    for (const pageNumber of body[chapterNumber]) {
      pageChildren.insertAdjacentHTML(
        "beforeend",
        `
<li>
  <a href="./?view=page&page=${pageNumber}">Chapter ${chapterNumber}: Page ${pageNumber}</a>
</li>
`,
      );
    }
  }
};

setupArchivePage();
