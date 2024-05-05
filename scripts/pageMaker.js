const fs = require("fs/promises");
const path = require("path");

const createFiles = async () => {
  for (let i = 1; i < 94; i++) {
    const page = `
{
  "image": "../assets/page_${i}.webp",
  "description": ""
}
`;
    await fs.writeFile(path.join(__dirname, `../pages/page_${i}.json`), page);
  }
};

createFiles();
