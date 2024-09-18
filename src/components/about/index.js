class About extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Questrial&family=Syne:wght@400..800&display=swap');
about-component {
  margin: 0 auto;
  padding: 20px 0;
  font-family: Questrial, sans-serif;
  max-width: 900px;
  display: block;
  background-color: #dbf2ff;
}
about-component h3 {
  font-family: Syne, sans-serif;
  font-size: 36px;
  margin-bottom: 28px;
  text-transform: uppercase;
}
about-component h4 {
  margin: 0;
  font: normal normal normal 16px/1.4em questrial,sans-serif;
  font-size: 22px;
  font-weight: bold;
}
about-component div.container {
  padding: 0 24px;
}
about-component p {
  font: normal normal normal 20px/1.4em questrial,sans-serif;
}
about-component div.about-the-author {
  display: flex;
  padding-bottom: 24px;
}
about-component img#portrait {
  width: auto;
  height: 225px;
  padding-right: 24px;
}
  @media all and (max-width: 700px) {
  about-component div.about-the-author {
    flex-direction: column;
    margin: 0 auto;
  }
  about-component img#portrait {
    max-width: 280px;
    margin: 0 auto;
    padding-bottom: 24px;
  }
}
</style>
<section>
  <div class="container">
    <h3>ABOUT THE COMIC</h3>
    <p>When he was thirteen years old, Julienne accidentally killed his best friend’s father in self-defense. Fueled by the stigma surrounding his siren-like species, the courts imprisoned him until, many years later, his estranged best friend has managed to negotiate his acquittal.</p>
    <br />
    <p>Greatly changed by their lives apart, she invites him into a world outside the small-town terrors of their adolescence, where even a hydrophin raised in self-loathing may learn to be free.</p>
    <br />
    <p>But Julienne wonders, isn’t it too late to start over?</p>
    <br />
    <p>JULIENNE is a story of first days, of learning to let go of the narratives that bind us, and of healing as the sum of a thousand small things.</p>
    <br />
    <p>Also available to read on
      <a href="https://www.webtoons.com/en/challenge/julienne/list?title_no=806490">Webtoons</a> and 
      <a href="https://tapas.io/series/julienne">Tapas</a>!</p>
    <br />
    <h3>ABOUT THE AUTHOR</h3>
    <div class="about-the-author">
      <img id="portrait" src="/selfportrait2018.webp"/>
      <div>
        <p><b>Sara</b> is a writer and illustrator passionate about the complicated journey of community and self-liberation. She lives in the Pacific Northwest with her old lady tuxedo cat and little brother ball python, and spends her free time bicycling, cooking, and spoiling her pets profusely.</p>
        <br />
        <p>She also writes prose! You can find her writing at her <a href="http://saranutter.wordpress.com/">
          non-fiction blog</a>, or her <a href="https://thebioroboticist.com/2022/08/18/00/">new-adult science
          fiction novel</a> about identity, belonging, and biotech cults, free to read online.</p>
      </div>
    </div>
  </div>
</section>
`;
  }
}
customElements.define("about-component", About);
