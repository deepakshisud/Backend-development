const franc = require("franc");
const lang = require("langs");

const input = process.argv[2]
const langCode = franc(input);

const language = lang.where("3",langCode);
console.dir(language.name);