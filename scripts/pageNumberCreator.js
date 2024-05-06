const fs = require("fs/promises");

const pageNumberCreator = async () => {
  let currentPageInChapter = 1;
  let currentChapter = 1;
  for (let index = 1; index < 93; index += 1) {
    const pageData = require(`../pages/page_${index}`);
    if (currentChapter != pageData.chapter) {
      currentChapter = pageData.chapter;
      currentPageInChapter = 1;
    }
    pageData.pageNumber = currentPageInChapter;
    await fs.writeFile(`../pages/page_${index}.json`, JSON.stringify(pageData));
    currentPageInChapter += 1;
  }
};
pageNumberCreator();
