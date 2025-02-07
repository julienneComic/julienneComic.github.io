const fs = require("node:fs/promises");
const { Feed } = require("feed");
const pageComponentData = require("../src/components/page/data.json");

async function generateRssPostsFeed() {

  const feed = new Feed({
    title: "Julienne A Graphic Novel",
    link: "https://juliennecomic.com",
    language: "en",
    copyright: "Copyright © " + new Date().getFullYear() + " Sara Nutter",
    author: {
      name: "Sara Nutter",
      link: "http://saranutter.wordpress.com/",
    },
    feedLinks: {
      rss2: `https://juliennecomic.com/feed.xml`,
    },
  });
  console.log(pageComponentData);
  for (let i = 10; i >= 0; i--) {
    const pageToAdd = pageComponentData.lastPage - i;
    console.log(pageToAdd);
    const pageData = require(`../pages/page_${pageToAdd}.json`);
    feed.addItem({
      title: `Chapter ${pageData.chapter}: Page ${pageData.pageNumber}`,
      image: 'https://www.juliennecomic.com' + pageData.image.slice(1, pageData.image.length),
      description: pageData.description || '',
      link: 'https://www.juliennecomic.com?view=pages&page=' + pageToAdd,
    })
  }
  const file = feed.rss2();
  console.log(file)
  // Write the RSS output to a public file, making it
  // accessible at siteUrl/rss.xml
  await fs.writeFile("./assets/rss.xml", file);
}
generateRssPostsFeed();
