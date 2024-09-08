class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
footer {
  background-color: #91cff4;
  color: black;
}
.social-links {
  width: 100%;
  display: flex;
  justify-content: end;
}
.social-links ul {
  display: flex;
  justify-content: space-between;
}
#patreon-banner {
  width: 100%;
  display: flex;
}
#patreon-banner img {
  margin: 20px auto;
  width: 70%;
  max-width: 900px;
  border: black 2px solid;
  box-sizing: border-box;
  padding: 0;
}
#background-image {
  background-image: url("./footer_background.png");
  background-size: 100%;
  margin: 0 auto;
  height: 67vw;
  max-height: 600px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.contact-info {
  flex-direction: column;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px auto 0 auto;
  width: 70%;
  max-width: 900px;
  box-sizing: border-box;
}
.contact-info > div {
  background-color: #dbf2ff;
  box-sizing: border-box;
}
.email {
  border: black 2px solid;
  padding: 8px;
}
.email form {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.email label {
  margin-bottom: 8px;
}
.email .input-container {
  margin-top: 8px;
  padding: 8px;
  background-color: #91cff4;
  border-radius: 24px;
}
.input-container input {
  background-color: inherit;
  border: none;
  flex: 1;
  margin: auto 10px;
  border-radius: 16px;
}
.input-container button {
  background-color: #dbf2ff;
  border-radius: 16px;
  cursor: pointer;
  padding: 8px;
}
.input-container button:hover {
  background-color: white;
}
#links a {
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
}
#links {
  padding: 8px;
  background-color: transparent;
  display: flex;
}
#links img {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}
.sub-section {
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#copywrite {
  color: white;
}
@media all and (max-width: 890px) {
  .contact-info {
    width: 95%;
    height: 100%;
    margin-top: 0;
  }
  #patreon-banner img {
    width: 95%;
  }
  #links {
    display: flex;
    justify-content: space-around;
  }
  #links img {
    margin: 0;
  }
  .email {
    width: 100%;
  }
  .input-container {
    display: flex;
  }
}
</style>
<footer>
  <section id="patreon-banner"><img src="./patreon_banner.png" /></section>
  <section id="background-image">
    <div class="contact-info">
      <div class="email">
        <div class="ml-embedded" data-form="tjWCy9"></div>
      </div>
    </div>
    <div class="sub-section" >
      <p id="copywrite">Art and Story © Sara Nutter 2024</p>
      <div id="links">
        <a href="https://www.instagram.com/sara_the_dragonfly/" >
          <img src="./insta2.png" />
        </a>
        <a href="https://www.snutter.com/" >
          <img src="./portfolio_icon.png" />
        </a>
        <a href="https://www.thebioroboticist.com/" >
          <img src="./biorob_icon.png" />
        </a>
        <a href="https://www.linktr.ee/" >
          <img src="./otherlinks_icon.png" />
        </a>
        <a href="https://www.patreon.com/snutter/" >
          <img src="./patreon logo.webp" />
        </a>
      </div>
    </div>
  </section>
</footer>
`;
  }
}

customElements.define("footer-component", Footer);

const setupFooter = () => {
  // waiting for the load event ensures the copywrite event exists
  window.addEventListener("load", () => {
    document.getElementById("copywrite").innerText =
      `Art and Story © Sara Nutter ${new Date().getFullYear()}`;
  });
};
setupFooter();
