class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<footer>
  <nav class="social-links">
    <ul>
      <li>
        <a href="https://www.instagram.com/sara_the_dragonfly/">
          <img
            alt="instagram"
            class="social-icon"
            src="./assets/instagram logo.png"
          />
        </a>
      </li>
      <li>
        <a href="https://twitter.com/snutterbutter">
          <img
            alt="twitter"
            class="social-icon"
            src="./assets/twitter logo.webp"
          />
        </a>
      </li>
      <li>
        <a href="http://ko-fi.com/snutter">
          <img
            alt="kofi"
            class="social-icon"
            src="./assets/kofi logo.webp"
          />
        </a>
      </li>
      <li>
        <a href="http://patreon.com/snutter">
          <img
            alt="patreon"
            class="social-icon"
            src="./assets/patreon logo.webp"
          />
        </a>
      </li>
    </ul>
  </nav>
  <div class="email">
    <h2>Sign up for email notifications!</h2>
    <h3>Receive an email when the comic updates.</h3>
  </div>
  <p class="copywrite">Art and Story © Sara Nutter 2023</p>
</footer>
`;
  }
}

customElements.define("footer-component", Footer);
