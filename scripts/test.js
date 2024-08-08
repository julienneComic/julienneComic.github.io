const script = `osascript -e 'tell application (path to frontmost application as text)
set myFile to choose file with prompt "Choose new Page image file" of type {["png", "webp", "jpg", "jpeg", "png"]}
POSIX path of myFile
end'`;

const util = require("util")
const exec = util.promisify(require("child_process").exec)
const main = async () => {
  const { stdout, stderr } = await exec(script)
  if (stderr !== "") throw new Error(stderr)
  console.log(stdout);
  return stdout.slice(0, stdout.length - 1)
}
main();
