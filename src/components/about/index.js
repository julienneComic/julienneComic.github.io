class About extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Questrial&family=Syne:wght@400..800&display=swap');
section {
  margin: 28px auto;
  font-family: Questrial, sans-serif;
  max-width: 981px;
  display: block;
}
section h3 {
  font-family: Syne, sans-serif;
  font-size: 36px;
  margin-bottom: 28px;
  text-transform: uppercase;
}
section h4 {
  margin: 0;
  font: normal normal normal 16px/1.4em questrial,sans-serif;
  font-size: 22px;
  font-weight: bold;
}
section div.container {
  padding: 0 24px;
}
section p {
  font: normal normal normal 20px/1.4em questrial,sans-serif;
}
section div.about-the-author {
  display: flex;
  padding-bottom: 24px;
}
section img {
  width: auto;
  height: 225px;
  padding-right: 24px;
}
  @media all and (max-width: 700px) {
  section div.about-the-author {
    flex-direction: column;
    margin: 0 auto;
  }
  section img {
    max-width: 280px;
    margin: 0 auto;
    padding-bottom: 24px;
  }
}
</style>
<section>
  <div class="container">
    <h3>About the Comic</h3>
    <br />
    <h4>When he was thirteen years old,</h4>
    <p>Julienne Zhavala accidentally killed his best friend's father in self defense.</p>
    <p>The courts would have easily acquitted him, had the event not revealed him to be hydrophin:
    a siren-like species that evolved as a predator to humans.</p>
    <br />
    <p>Though few of his kind maintain the activity in modern times, humans heavily stigmatize them,
    and the community Julienne had only ever tried to love locked him away as a danger.</p>
    <br />
    <p>Fifteen years later, his childhood best friend, Opal Reyes, has finally managed to negotiate
    his acquittal. Greatly changed by their lives apart, she invites him into a world outside the
    small-town terrors of their adolescence, where even a hydrophin raised in self- loathing may
    learn to be free.</p>
    <br />
    <p>But Julienne wonders, <br />isn't it too late to start over?</p>
    <br />
    <p>JULIENNE is a story of first days, of letting go of the narratives that bind us, and healing
    as the sum of a thousand small things.</p>
    <br />
    <p>Also available to read on
      <a href="https://www.webtoons.com/en/challenge/julienne/list?title_no=806490">Webtoons</a> and 
      <a href="https://tapas.io/series/julienne">Tapas</a>!</p>
    <br />
    <h3>About the Author</h3>
    <div class="about-the-author">
      <img src="/selfportrait2018.webp"/>
      <div>
        <p><b>Sara</b> is a writer and illustrator passionate about the complicated journey of learning to
        love and liberate our whole selves. She lives in the PNW with her old lady tuxedo cat and little 
        brother ball python, and spends her free time bicycling, cooking, and spoiling her pets profusely.
        This is her first graphic novel.</p>
        <br />
        <p>She also writes prose! You can find her writing at her <a href="http://saranutter.wordpress.com/">
          non-fiction blog</a>, or her <a href="https://thebioroboticist.com/2022/08/18/00/">new-adultscience
          science fiction novel</a> about identity, belonging, and mad science, free to read online.</p>
      </div>
    </div>
  </div>
</section>
`;
  }
}
customElements.define("about-component", About);
