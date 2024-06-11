// #!/bin/bash
// echo Welcome to the page creation wizard :-D
// mkdir tempNewPage
//
// echo A new folder has been created in the root of this repo called tempNewPage. Please add the page image there
//
// read -p "Press enter when you're done adding the image"
//
// if ls ./tempNewPage/*.png 1>/dev/null 2>&1; then
// 	echo "Image found, thanks!"
// else
// 	echo "No image in tempNewPage. Page Creation failed."
// 	exit
// fi
console.log("Welcome to the page creation wizard");

const fs = require("node:fs/promises");

const creationWizard = async () => {
  // create a directory for the new page image to be added
  try {
    await fs.mkdir(__dirname + "/tempNewPage");
  } catch {
    console.log("\ntempNewPage already exists");
  }

  console.log(
    "\nA new folder has been created in the root of this repo called tempNewPage. Please add the page image there",
  );

  try {
    // wait for new image to be added
    const readline = require("node:readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await new Promise((resolve) => {
      rl.question("Press enter when you're done adding the image", () =>
        resolve(),
      );
    });
  } catch (error) {
    console.log("\nerror waiting for the image to be added");
    throw error;
  }
  const path = require("path");
  const tempNewPagePath = path.join(__dirname, "..", "tempNewPage");

  // Verify one new image has been added
  const images = await fs.readdir(tempNewPagePath);
  console.log(images.length, tempNewPagePath);
  if (images.length !== 1) {
    throw new Error(`There should only be one image in the newTempPage.
Please ensure there is only one image in the newTempPage directory and restart the script`);
  }

  const pageMetadataPath = path.join(
    __dirname,
    "..",
    "src",
    "components",
    "page",
    "data.json",
  );
  const pageMetadata = require(pageMetadataPath);
  const newPageImageNumber = pageMetadata.lastPage + 1;
  const imageFileExtension = images[0].split(".")[1];
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
  // use image's new location to create a page json file
  // increment the lastpage property in the page/data.json so the buttons that use the value will be updated
  // Let the user know this worked

  process.exit(0);
};
creationWizard();
