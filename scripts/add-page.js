console.log("Welcome to the page creation wizard");

const fs = require("node:fs/promises");
const path = require("path");
const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const componentsPath = path.join(__dirname, "..", "src", "components");

const creationWizard = async () => {
  // create a directory for the new page image to be added
  try {
    await fs.mkdir(path.join(__dirname, "..", "tempNewPage"));
  } catch {
    console.log("\ntempNewPage already exists");
  }

  console.log(
    "\nA new folder has been created in the root of this repo called tempNewPage. Please add the page image there",
  );

  try {
    // wait for new image to be added
    await new Promise((resolve) => {
      rl.question("Press enter when you're done adding the image", () =>
        resolve(),
      );
    });
  } catch (error) {
    console.log("\nerror waiting for the image to be added");
    throw error;
  }
  const tempNewPagePath = path.join(__dirname, "..", "tempNewPage");

  // Verify one new image has been added
  const images = await fs.readdir(tempNewPagePath);
  if (images.length !== 1) {
    throw new Error(`There should only be one image in the newTempPage.
   Please ensure there is only one image in the newTempPage directory and restart the script`);
  }

  const pageMetadataPath = path.join(componentsPath, "page", "data.json");
  const pageMetadata = require(pageMetadataPath);
  const newPageImageNumber = pageMetadata.lastPage + 1;
  const imageFileArray = images[0].split(".");
  const imageFileExtension = imageFileArray[imageFileArray.length - 1];
  const newImageFileName =
    "page_" + newPageImageNumber + "." + imageFileExtension;
  const newImagePath = path.join(__dirname, "..", "assets", newImageFileName);
  const providedImagePath = path.join(tempNewPagePath, images[0]);

  // Move new image to assets with a useful name
  try {
    await fs.rename(providedImagePath, newImagePath);
  } catch (error) {
    console.log(
      "Error moving image to assets folder. Is there an image called",
      newImageFileName,
      "already there?",
      "\n Please delete that image and rerun the script",
    );
    throw error;
  }

  // ask if this is the first page of a new chapter. Update the archiveData given that choice
  try {
    let answer = await new Promise((resolve) => {
      rl.question(
        "Is this the first page of a new chapter? y or n: ",
        (answer) => resolve(answer === "y" || answer === "Y"),
      );
    });
    const archiveDataPath = path.join(componentsPath, "archive", "data.json");
    const archiveData = require(archiveDataPath);
    const lastChapter = archiveData.chapters[archiveData.chapters.length - 1];
    if (answer) {
      let chapterTitle = await new Promise((resolve) => {
        rl.question("What is the title of the new chapter?", (answer) =>
          resolve(answer),
        );
      });
      archiveData.chapters.push({ title: chapterTitle, pages: [1] });
    } else {
      lastChapter.pages.push(
        lastChapter.pages[lastChapter.pages.length - 1] + 1,
      );
    }
    await fs.writeFile(archiveDataPath, JSON.stringify(archiveData));
  } catch (error) {
    console.log("Error updating Archive data", error);
  }

  // use new image location and archive data to create page json file
  const archiveData = require("../src/components/archive/data.json");
  const lastChapter = archiveData.chapters[archiveData.chapters.length - 1];
  const lastPage = lastChapter.pages[lastChapter.pages.length - 1];
  try {
    await fs.writeFile(
      path.join(__dirname, "..", "pages", `page_${newPageImageNumber}.json`),
      `{
  "image": "./page_${newPageImageNumber}.${imageFileExtension}",
  "description": "",
  "chapter": ${archiveData.chapters.length},
  "pageNumber": ${lastPage + 1}
}`,
    );
  } catch (error) {
    console.log("Error generating page file", error);
  }

  // increment the lastpage property in the page/data.json so the buttons that use the value will be updated
  try {
    const pagesDataPath = path.join(componentsPath, "page", "data.json");
    const pagesData = require(pagesDataPath);
    await fs.writeFile(
      pagesDataPath,
      JSON.stringify({ lastPage: pagesData.lastPage + 1 }),
    );
  } catch (error) {
    console.log("Error updating pages component data file", error);
  }

  // Let the user know this worked
  console.log("Success!");
  process.exit(0);
};
creationWizard();
