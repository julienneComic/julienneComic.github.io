const castData = require("./data.json");

class Cast extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
cast-component {
  font: normal normal normal 22px/1.4em syne,sans-serif;
  background-color: #dbf2ff;
  padding: 40px 0 40px 0;
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
}
cast-component section > div {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  padding: 0 40px 0 40px;
}
.character {
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
cast-component img {
  padding: 0 20px 20px 0;
  width: 142px;
  height: 142px;
}
cast-component h2 {
  font-size: 36px;
  width: 100%;
  margin-bottom: 20px;
  padding-left: 40px;
}
cast-component h3 {
  font-size: 28px;
}
cast-component th {
  text-align: left;
  vertical-align: top;
}
cast-component table {
  padding-bottom: 20px;
}
cast-component p {
padding-bottom: 20px;
}
@media (min-width: 800px) {
  .character {
    width: 50%;
  }
}
@media (max-width: 400px) {
  cast-component h3 {
    width: 50%;
  }
}
</style>
<section>
  <h2>Cast</h2>
  <div id="content"></div>
</section>
`;
  }
}

customElements.define("cast-component", Cast);

const setupCastPage = async () => {
  const content = document.getElementById("content");

  for (const character of castData.characters) {
    const tableRows = character.tableRows.reduce(
      (previousValue, { label, data }) => {
        const dataMarkup = data.join(`<br />`);
        return (
          previousValue +
          `
        <tr>
          <th>${label}:</th>
          <td>${dataMarkup}</td>
        </tr>
`
        );
      },
      "",
    );
    const characterMarkup = `
  <div class="character">
    <img src="${character.image}">
    <h3>${character.name}</h3>
    <div>
      <table
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
    <p>${character.description}</p>
  </div>
`;
    content.insertAdjacentHTML("beforeend", characterMarkup);
  }
};

window.addEventListener("load", setupCastPage);
