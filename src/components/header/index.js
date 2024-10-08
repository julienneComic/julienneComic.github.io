const data = require("../page/data.json");
const heightStyle = `height: 14vw;
  max-height: 75px;
`
class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
header-component {
  display: flex;
}
header {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
header .banner {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
header nav {
  display: flex;
  justify-content: center;
  ${heightStyle}
}
nav img {
  ${heightStyle}
}
nav ul {
  display: flex;
  margin: 0;
  padding: 0;
}
nav li a {
  display: block;
  height: 0;
}
nav div {
  display: block;
  background-image: url("./menu_bar_left.png");
  width: 100%;
  background-position: right;
  ${heightStyle}
}
</style>
<header class="header-container">
  <img class="banner" src="./header_banner.png" />
  <nav>
    <div style="background-image: url('./menu_bar_left.png'); background-position: right;" ></div>
    <ul>
      <li><a href="./?view=pages&page=1"><img src="./menu_bar_home.png"/></a></li>
      <li><img src="./menu_bar_divider.png"/></li>
      <li><a href="./?view=about"><img src="./menu_bar_about.png"/></a></li>
      <li><img src="./menu_bar_divider.png"/></li>
      <li><a href="./?view=archive"><img src="./menu_bar_archive.png"/></a></li>
      <li><img src="./menu_bar_divider.png"/></li>
      <li><a href="./?view=cast"><img src="./menu_bar_cast.png"/></a></li>
    </ul>
    <div style="background-image: url('./menu_bar_right.png'); background-position: left;" ></div>
  </nav>
</header>
`;
  }
}

customElements.define("header-component", Header);
