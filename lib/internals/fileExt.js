const { isProd } = require("./env");
const isTypescript = require("./isTypescript");

const ext = isTypescript() && !isProd() ? '.ts' : '.js';
module.exports = ext;