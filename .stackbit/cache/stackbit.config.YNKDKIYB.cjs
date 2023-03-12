function stackbit_process_cwd_shim() { return "/Users/andreanarbot/Documents/GitHub/andrea-netlify-demo" }
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

// stackbit.config.js
var stackbit_config_exports = {};
__export(stackbit_config_exports, {
  default: () => stackbit_config_default
});
module.exports = __toCommonJS(stackbit_config_exports);
var import_cms_contentful = require("../../node_modules/@stackbit/cms-contentful/dist/index.js");
var import_types = require("../../node_modules/@stackbit/types/dist/index.js");
var stackbit_config_default = (0, import_types.defineStackbitConfig)(
  {
    stackbitVersion: "~0.6.0",
    ssgName: "gatsby",
    nodeVersion: "16",
    contentSources: [
      new import_cms_contentful.ContentfulContentSource({
        spaceId: "3hx3gkejasvh",
        environment: "master",
        previewToken: "3PKZsPaRP4BAGvhAohilRVg7b0lAmxeBR0U2pHGx4IE",
        accessToken: "CFPAT-9UP8IEJcv3vU0XNLGWmP-7K78OcZ6CNIurKrHexXJsU"
      })
    ],
    modelExtensions: [{ name: "page", type: "page", urlPath: "/{slug}" }]
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=stackbit.config.YNKDKIYB.cjs.map
