var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var neutronAdapter_exports = {};
__export(neutronAdapter_exports, {
  getDataFromNeutron: () => getDataFromNeutron
});
module.exports = __toCommonJS(neutronAdapter_exports);
var import_graphql_request = require("graphql-request");
const neutronClient = () => {
  try {
    let neutronApi = "", neutronToken = "";
    console.log(process.env.NEUTRON_API);
    if (process.env.NEUTRON_API && process.env.NEUTRON_TOKEN) {
      neutronApi = process.env.NEUTRON_API;
      neutronToken = process.env.NEUTRON_TOKEN;
      return new import_graphql_request.GraphQLClient(neutronApi, {
        headers: { Authorization: neutronToken }
      });
    }
    throw new Error("Something went wrong at Neutron Client");
  } catch (error) {
    throw error;
  }
};
const getDataFromNeutron = (query, transformer = null) => {
  const data = neutronClient().request(query);
  console.log(data);
  if (transformer)
    return transformer(data);
  else
    return data;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDataFromNeutron
});
