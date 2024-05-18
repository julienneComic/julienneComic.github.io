class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<header class="header-container">
  <h2 class="update-blurb">Updates Fridays</h2>
  <h1 class="site-title">JULIENNE</h1>
  <h2 class="site-sub-title">a graphic novel</h2>
  <button class="open-nav-button" onclick="openNav()">☰</button>
  <nav id="nav-bar">
    <ul>
      <li>
        <button class="close-button" onclick="closeNav()">&#x2715;</button>
      </li>
      <li><a href="./?view=pages&page=93" class="nav-button">LATEST</a></li>
      <li>
        <a href="./?view=pages&page=1" class="nav-button"
          >START FROM THE BEGINNING</a>
      </li>
      <li><a href="./?view=about" class="nav-button">ABOUT</a></li>
      <li><a href="./?view=cast" class="nav-button">CAST</a></li>
      <li><a href="./?view=archive" class="nav-button">ARCHIVE</a></li>
    </ul>
  </nav>
</header>
`;
  }
}

customElements.define("header-component", Header);
