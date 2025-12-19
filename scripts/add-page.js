console.log("Welcome to the page creation wizard");

const fs = require("node:fs/promises");
const path = require("path");
const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const componentsPath = path.join(__dirname, '..', 'src', 'components');

const creationWizard = async () => {
  // ask the user to select an image with the system's file explorer
try {
  const script = `osascript -e 'tell application (path to frontmost application as text)
 set myFile to choose file with prompt "Choose new Page image file" of type {["png", "webp", "jpg", "jpeg", "png"]}
 POSIX path of myFile
 end'`;

  const util = require("util")
  const exec = util.promisify(require("child_process").exec)
  const { stdout, stderr } = await exec(script)
  if (stderr !== "") throw new Error(stderr)
  providedImagePath = stdout.slice(0, stdout.length - 1);
} catch (error) {
  console.log("\nerror waiting for the image to be added");
  throw error;
}
  console.log(providedImagePath, 'Has been selected')

  const pageMetadataPath = path.join(componentsPath, "page", "data.json");
  const pageMetadata = require(pageMetadataPath);

  const newPageImageNumber = pageMetadata.lastPage + 1;
<<<<<<< Updated upstream
<<<<<<< Updated upstream

  const fileExtensionDivider = providedImagePath.lastIndexOf(".");
  const imageFileExtension = providedImagePath.slice(fileExtensionDivider, providedImagePath.length);
  const newImageFileName = "page_" + newPageImageNumber + imageFileExtension;
  
=======
=======
>>>>>>> Stashed changes
  const imageFileArray = providedImagePath.split(".");
  const imageFileExtension = imageFileArray[imageFileArray.length - 1];
  const newImageFileName =
    "page_" + newPageImageNumber + "." + imageFileExtension;
>>>>>>> Stashed changes
  const newImagePath = path.join(__dirname, "..", "assets", newImageFileName);

  const archiveDataPath = path.join(componentsPath, "archive", "data.json");
  const archiveData = require(archiveDataPath);

  const lastChapter = archiveData.chapters[archiveData.chapters.length - 1];
  const lastPage = lastChapter.pages[lastChapter.pages.length - 1];

  // Move new image to assets with a useful name
  try {
    await fs.copyFile(providedImagePath, newImagePath);
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
        "Type 'y' and enter if this is the first page of a new chapter.\n Or just press enter if page is a part of an existing chapter: ",
        (answer) => resolve(answer === "y" || answer === "Y"),
      );
    });
    if (answer) {
      let chapterTitle = await new Promise((resolve) => {
        rl.question("What is the title of the new chapter?: ", (answer) =>
          resolve(answer),
        );
      });
      archiveData.chapters.push({ title: chapterTitle, pages: [1] });
    } else {
      lastChapter.pages.push(
        lastPage + 1,
      );
    }
    await fs.writeFile(archiveDataPath, JSON.stringify(archiveData));
  } catch (error) {
    console.log("Error updating Archive data", error);
    throw error;
  }
  // use new image location and archive data to create page json file
  try {
    const newestChapter = archiveData.chapters[archiveData.chapters.length - 1];
    const newFileDirectoryName = path.join(__dirname, "..", "pages", `page_${newPageImageNumber}.json`);

    await fs.writeFile(
      path.join(newFileDirectoryName),
      `{
  "image": "./page_${newPageImageNumber}${imageFileExtension}",
  "description": "",
  "chapter": ${archiveData.chapters.length},
  "pageNumber": ${newestChapter.pages[newestChapter.pages.length - 1]}
}`,
    );

    console.log("If you want to add a description edit the json file at this path", newFileDirectoryName);

  } catch (error) {
    console.log("Error generating page file", error);
    throw error;
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
    throw error;
  }

  // Let the user know this worked
  console.log("Success!");
  process.exit(0);
};
creationWizard();
