class Archive extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = ``;
  }
}

customElements.define("about-component", Archive);
