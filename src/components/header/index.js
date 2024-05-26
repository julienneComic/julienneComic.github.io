class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
.header-container {
  max-width: 981px;
  margin: 0 auto;
  overflow: auto;
}
@media all and (min-width: 891px) {
  .header-container {
      background-image: url("./header_50_percent.webp");
    }
}
.update-blurb {
  text-align: right;
  color: rgb(37, 49, 141);
  padding: 3% 6%;
  font-size: 2rem;
  margin: 0;
}
.site-title {
  text-align: center;
  font-size: 4rem;
  margin-top: 300px;
}
.site-sub-title {
  text-align: center;
  font-size: 1.5rem;
}
@media all and (max-width: 890px) {
  .title-container {
    margin: 0 auto;
    background-image: url("./header_25_percent.webp");
    width: 90vw;
    margin: 0 auto;
    background-size: 110vw;
  }
  .site-title {
    font-size: 8vw;
    padding-top: 46vw;
    margin: 0;
  }
  .site-sub-title {
    font-size: 4vw;
    padding-bottom: 20px;
  }
}
#nav-bar {
  margin: 64px auto;
  width: 90%;
}
#nav-bar ul {
  display: flex;
  justify-content: space-between;
}
.open-nav-button {
  display: none;
}
.close-button {
  display: none;
}
@media all and (max-width: 890px) {
  #nav-bar {
    margin: 0;
    height: 100vh;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgb(256, 256, 256);
    background-color: rgba(256, 256, 256, 0.9);
    overflow-x: hidden;
  }
  #nav-bar ul {
    padding: 0;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
  }
  #nav-bar ul li {
    padding: 1rem 1.5rem;
    margin: 0.5rem;
  }
  #nav-bar.open {
    display: block;
    margin: 0;
    width: 100vw;
  }
  #nav-bar.transition {
    transition: 0.5s ease-out;
  }
  .open-nav-button {
    display: block;
    background-color: transparent;
    font-size: 96px;
    border: none;
    position: relative;
    top: -120px;
  }
  .close-button {
    display: block;
    position: absolute;
    background-color: white;
    border: none;
    top: 25px;
    right: 25px;
    font-size: 25px;
    z-index: inherit;
    width: 40px;
    height: 40px;
  }
}
.nav-button {
  padding: 1rem 1.5rem;
  background-color: white;
  font-size: 1.25rem;
  transition: 0.3s;
  color: rgb(64, 77, 174);
  text-wrap: nowrap;
}
.nav-button:hover {
  background-color: rgb(64, 77, 174);
  opacity: 100%;
  color: white;
}
.absolutely-positioned {
  position: absolute;
  right: 5vw;
}
.open-nav-button {
  
}
</style>
<header class="header-container">
  <h2 class="update-blurb">Updates Fridays</h2>
  <div class="title-container">
    <h1 class="site-title">JULIENNE</h1>
    <h2 class="site-sub-title">a graphic novel</h2>
    <div class="absolutely-positioned">
      <button class="open-nav-button" onclick="openNav()">☰</button>
    </div>
  </div>
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
