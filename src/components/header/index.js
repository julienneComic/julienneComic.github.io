const data = require("../page/data.json");
class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
header {
  display: flex;
  background-color: #91cff4;
  flex-direction: column;
}
header .banner {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
header nav {
  display: flex;
  overflow: hidden;
  justify-content: center;
}
nav img {
  height: 75px;
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
nav li {
  height: 75px;
}
nav div {
  display: block;
  background-image: url("./menu_bar_left.png");
  width: 100%;
  background-position: right;
  height: 75px;
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
