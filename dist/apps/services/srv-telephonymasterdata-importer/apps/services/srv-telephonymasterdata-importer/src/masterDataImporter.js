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
var masterDataImporter_exports = {};
__export(masterDataImporter_exports, {
  default: () => masterDataImporter_default
});
module.exports = __toCommonJS(masterDataImporter_exports);
var import_NeutronQueryList = require("./NeutronQueryList");
var import_neutron = require("@vca-integration-hub/adapters/neutron");
const masterDataImporter = async (type, fromDate, skip = 0, limit = 100) => {
  const query = (0, import_NeutronQueryList.getNeutronQueryList)(type, fromDate, skip, limit);
  var data;
  do {
    console.log(query);
    data = await (0, import_neutron.getDataFromNeutron)(query);
  } while (data?.data != null && data?.data?.length == limit);
  console.log("these data will be written to Kafka");
  console.log(data);
};
var masterDataImporter_default = masterDataImporter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
