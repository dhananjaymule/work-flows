"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromNeutron = void 0;
const graphql_request_1 = require("graphql-request");
const neutronClient = () => {
    try {
        let neutronApi = '', neutronToken = '';
        console.log(process.env.NEUTRON_API);
        if (process.env.NEUTRON_API && process.env.NEUTRON_TOKEN) {
            neutronApi = process.env.NEUTRON_API;
            neutronToken = process.env.NEUTRON_TOKEN;
            return (new graphql_request_1.GraphQLClient(neutronApi, {
                headers: { Authorization: neutronToken },
            }));
        }
        throw new Error("Something went wrong at Neutron Client");
    }
    catch (error) {
        // logger().error("Error in Neutron Client", { error })
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
exports.getDataFromNeutron = getDataFromNeutron;
//# sourceMappingURL=neutronAdapter.js.map