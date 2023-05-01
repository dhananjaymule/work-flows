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
var NeutronQueryList_exports = {};
__export(NeutronQueryList_exports, {
  getNeutronQueryList: () => getNeutronQueryList
});
module.exports = __toCommonJS(NeutronQueryList_exports);
var import_types = require("./types");
var import_graphql_request = require("graphql-request");
const getNeutronQueryList = (type, fromDate, skip = 0, limit = 100) => {
  let whereQuery = fromDate ? `mdm_batch_load_ts: { gt: "${fromDate}" }` : "";
  switch (type) {
    case import_types.importType.WxCEnterprise:
      console.log(process.env.NT_ENTERPRISE_INSTALL_VERSION);
      return import_graphql_request.gql`
                    {
                        data: findManyNt_Enterpriseinstall${process.env.NT_ENTERPRISE_INSTALL_VERSION}Fact(
                            where: { 
                                ${whereQuery}
                                enable_vca: { equals: true }
                                install_platform: { equals: wxc } 
                            }
                            distinct: fk_eis_enterprise_id
                        ) {
                            date_created: mdm_created_ts
                            date_modified: mdm_batch_load_ts
                            eis_id: fk_eis_enterprise_id
                            install_date
                            install_platform
                            tag
                            install_status
                            platform_identifier: platform_ent_id
                            enterprise: Cdk_Eisenterprises${process.env.ENTERPRISE_VERSION}Fact {
                                enterprise_name
                            }
                        }
                    }
                `;
    case import_types.importType.WxCUsers:
      return import_graphql_request.gql`
            {
                data: findManyVca_Wxcusers${process.env.WXC_USERS_VERSION}Fact(
                    where: {
                        ${whereQuery}
                    }
                    orderBy: {
                        mdm_batch_load_ts: asc
                    }
                    skip: ${skip}
                    take: ${limit}
                ) {
                    date_created: mdm_created_ts
                    date_modified: mdm_batch_load_ts
                    org_uuid: orguuid
                    userid: useruuid
                    eis: fk_eis_id
                    phonenumbers
                    firstname
                    lastname
                    emailaddress
                    extension
                    department_name: departmentname
                    department_uuid: departmentuuid
                    location_name: locationname
                    location_uuid: locationuuid
                    login_enabled: loginenabled
                    mdm_deleted_flag: mdm_deleted_flag
                }
            }`;
    case import_types.importType.WxCHuntGroup:
      return import_graphql_request.gql`
    {
        data: findManyVca_Wxchuntgroups${process.env.HUNTGROUP_VERSION}Fact(
            where: {
                ${whereQuery}
            }
            orderBy: {
                mdm_batch_load_ts: asc
            }
            skip: ${skip}
            take: ${limit}
        ) {
            date_created: mdm_created_ts
            date_modified: mdm_batch_load_ts
            org_uuid: orguuid
            eis: fk_eis_id
            huntgroup_id: huntgroupuuid
            extension
            phone_number: phonenumber
            name
            department_name: departmentname
            department_uuid: departmentuuid
            location_name: locationname
            location_uuid: locationuuid
            huntgroup_enabled: huntgroupenabled
            mdm_deleted_flag: mdm_deleted_flag
        }
    }`;
    case import_types.importType.WxCStores:
      return import_graphql_request.gql`
    {
        data: findManyNt_Storeinstall${process.env.NT_STORE_INSTALL_VERSION}Fact(
            where: {
                ${whereQuery}
                install_platform: { equals: wxc }
            }
            orderBy: {
                mdm_batch_load_ts: asc
            }
            skip: ${skip}
            take: ${limit}
        ) {
            date_created: mdm_created_ts
            date_modified: mdm_batch_load_ts
            install_by
            install_platform
            wxc_location_name
            fk_eis_store_id
            ipns_billto_cmf
            install_status
            tag
            platform_store_id
            ipns_ship_cmf
            install_date
            fk_ent_install_id
            store_install_id
            channel_composite_key
            store: Cdk_Eisstores${process.env.CDK_EIS_STORES_VERSION}Fact {
                store_name
                eis: enterprise_id
            }
        }
    }`;
    case import_types.importType.WxCDepartments:
      whereQuery = fromDate ? `
        OR: [
            { lastupdatedts: { gt: "${fromDate}" } }
            { mdm_batch_load_ts: { gt: "${fromDate}" } }
        ]
    ` : "";
      return import_graphql_request.gql`
    {
        data: findManyVca_Wxcdepartments${process.env.WXC_DEPARTMENT_VERSION}Fact(
            where: {
                ${whereQuery}
            }
            orderBy: {
                mdm_batch_load_ts: asc
            }
            skip: ${skip}
            take: ${limit}
        ) {
            date_created: mdm_created_ts
            date_modified: mdm_batch_load_ts
            last_updated_ts: lastupdatedts # this is added for manual updates from VCRL >> storeConfiguration
            org_uuid: orguuid
            eis: fk_eis_id
            dept_id: departmentuuid
            department_name: name
            membercount
            mdm_deleted_flag
            locationuuid
        }
    }`;
    default:
      throw new Error("Invalid Import type");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getNeutronQueryList
});
