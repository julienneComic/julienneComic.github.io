const fs = require("fs/promises");

const generateArchiveData = async () => {
  const archivePageData = {};
  for (let i = 1; i < 94; i += 1) {
    const { chapter, pageNumber } = require(`../pages/page_${i}.json`);
    if (archivePageData[chapter]) {
      archivePageData[chapter].push(pageNumber);
      continue;
    }
    archivePageData[chapter] = [pageNumber];
  }
  await fs.writeFile(
    "../src/data/archive.json",
    JSON.stringify(archivePageData),
  );
};

generateArchiveData();
