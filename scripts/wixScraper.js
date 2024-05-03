const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
// const log =
//   require("simple-node-logger").createSimpleFileLogger("../sources.log");
const fs = require("fs").promises;
const smallTest = [
  "title",
  "chapter-one-title",
  "_1_01",
  "_1_02",
  "_1_03",
  "_1_04",
  "_1_05",
];

async function getData(url, index) {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get(url);
    await driver.manage().setTimeouts({ implicit: 500 });
    await driver.wait(
      until.elementLocated(
        By.xpath("//img[@data-hook='gallery-item-image-img']"),
      ),
      10000,
    );
    const imgs = await driver.findElement(
      By.xpath("//img[@data-hook='gallery-item-image-img']"),
    );
    const source = await imgs.getAttribute("src");
    console.log(index, source);
  } finally {
    await driver.quit();
  }
}
const host = "https://www.juliennecomic.com/post/";

const batchRequest = async (array) => {
  let index = 43;
  for (path of array) {
    index += 1;
    await getData(host + path, index);
  }
};
const pages = [
  // "title",
  // "chapter-one-title",
  // "_1_01",
  // "_1_02",
  // "_1_03",
  // "_1_04",
  // "_1_05",
  // "_1_06",
  // "_1_07",
  // "_1_08",
  // "_1_09",
  // "_1_10",
  // "_1_11",
  // "_1_12",
  // "_1_13",
  // "chapter-two-title",
  // "_2_01",
  // "_2_02",
  // "_2_03",
  // "_2_04",
  // "_2_05",
  // "_2_06",
  // "_2_07",
  // "_2_08",
  // "amv-interlude",
  // "_2_09",
  // "_2_10",
  // "_2_11",
  // "_2_12",
  // "_2_13",
  // "_2_14",
  // "_2_15",
  // "_2_16",
  // "_2_17",
  // "_2_18",
  // "_2_19",
  // "_2_20",
  // "_2_21",
  // "_2_22",
  // "chapter-three-title",
  // "__3_1",
  // "__3_2",
  // "interlude",
  "__3_3",
  "__3_4",
  "__3_5",
  "__3_6",
  "__3_7",
  "__3_8",
  "__3_9",
  "_3_10",
  "_3_11",
  "_3_12",
  "_3_13",
  "_3_14",
  "_3_15",
  "_3_16",
  "_3_17",
  "_3_18",
  "_3_19",
  "_3_20",
  "_3_21",
  "_3_22",
  "_3_23",
  "_3_24",
  "_3_25",
  "_3_26",
  "_3_27",
  "_3_28",
  "_3_29",
  "_3_30",
  "_3_31",
  "_3_32",
  "_3_33",
  "_3_34",
  "_3_35",
  "_3_36",
  "_3_37",
  "_3_38",
  "_3_39",
  "_3_40",
  "_3_41",
  "chapter-four-title",
  "__4_1",
  "__4_2",
  "__4_3",
  "__4_4",
  "__4_5",
  "__4_6",
  "__4_7",
  "__4_8",
  "__4_9",
  "_4_10",
];

batchRequest(pages);
