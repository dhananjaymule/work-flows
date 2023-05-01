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
var types_exports = {};
__export(types_exports, {
  importType: () => importType
});
module.exports = __toCommonJS(types_exports);
var importType = /* @__PURE__ */ ((importType2) => {
  importType2[importType2["WxCEnterprise"] = 0] = "WxCEnterprise";
  importType2[importType2["WxCStores"] = 1] = "WxCStores";
  importType2[importType2["WxCDepartments"] = 2] = "WxCDepartments";
  importType2[importType2["WxCUsers"] = 3] = "WxCUsers";
  importType2[importType2["WxCHuntGroup"] = 4] = "WxCHuntGroup";
  return importType2;
})(importType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  importType
});
