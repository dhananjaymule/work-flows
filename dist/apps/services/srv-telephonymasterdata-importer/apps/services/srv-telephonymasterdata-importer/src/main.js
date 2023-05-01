var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_newrelic = __toESM(require("newrelic"));
var import_masterDataImporter = __toESM(require("./masterDataImporter"));
var import_types = require("./types");
var dotenv = __toESM(require("dotenv"));
var path = __toESM(require("path"));
const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
process.env.NODE_ENV = "development";
console.log(process.env.NODE_ENV);
dotenv.config({
  path: path.resolve(`${__dirname}/env/.env.${process.env.NODE_ENV}`)
});
console.log(path.resolve(`${__dirname}/env/.env.${process.env.NODE_ENV}`));
import_newrelic.default.instrumentLoadedModule(
  "express",
  // the module's name, as a string
  import_express.default
  // the module instance
);
const app = (0, import_express.default)();
app.get("/", (req, res) => {
  res.send({ message: "Hello API" });
});
app.get("/health", (req, res) => {
  res.send({ status: "UP" });
});
const last_updated_ts = "2023-01-25T06:42:18.187Z";
(0, import_masterDataImporter.default)(import_types.importType.WxCEnterprise, last_updated_ts);
(0, import_masterDataImporter.default)(import_types.importType.WxCDepartments, last_updated_ts);
(0, import_masterDataImporter.default)(import_types.importType.WxCHuntGroup, last_updated_ts);
(0, import_masterDataImporter.default)(import_types.importType.WxCStores, last_updated_ts);
(0, import_masterDataImporter.default)(import_types.importType.WxCUsers, last_updated_ts);
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
