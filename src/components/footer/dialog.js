class Dialog extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
#open-dialog-button {
  margin: 0 auto;
  display: block;
  background-color: #dbf2ff;
  cursor: pointer;
  padding: 20px;
}
#open-dialog-button h4 {
  color: #000000;
  font-family: 'Poppins', sans-serif;
  font-size: 29px;
  font-weight: 400;
  margin: 0 0 10px 0;
  text-align: left;
  word-break: break-word;
}
#open-dialog-button p {
  color: #3286c7;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 0 10px 0;
  text-align: left;
}
#email-dialog {
  background-color: #dbf2ff;
  padding: 0;
}
#close-dialog-button {
  background-color: #4abdb1;
  border: none;
  border-radius: 4px;
  box-shadow: none;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
  height: auto;
  padding: 10px;
  width: 100%;
}
#close-dialog-button:hover {
  background-color: #829cff;
}
@media all and (max-width: 890px) {
  #open-dialog-button p {
    display: none;
  }
  #open-dialog-button h4 {
    margin: 0;
    font-size: 24px;
  }
}
</style>
<button class="mobile-email-button" id="open-dialog-button">
  <h4>Sign up for email notifications!</h4>
  <p>Receive an email when the comic updates!</p>
</button>
<dialog id="email-dialog">
  <div class="ml-embedded" data-form="tjWCy9"></div>
  <div style="width: 100%; box-sizing: border-box; padding: 0 20px 20px 20px;">
    <button id="close-dialog-button" aria-label="close dialog button">Close</button>
  </div>
</dialog>
`};
};


customElements.define("dialog-component", Dialog);

const setupDialog = () => {
  window.addEventListener("load", () => {
    const dialogEl = document.getElementById("email-dialog")
    const openButton = document.getElementById("open-dialog-button")
    const closeButton = document.getElementById("close-dialog-button")
    
    openButton.addEventListener("click", () => {
      console.log('clicked open button')
      dialogEl.showModal();
    })
    
    closeButton.addEventListener("click", () => {
      dialogEl.close();
    })
  });
};
setupDialog();
// exports = {setupDialog};
