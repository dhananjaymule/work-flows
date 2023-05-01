import { GraphQLClient } from 'graphql-request'


const neutronClient = () => {
    try {
        let neutronApi = '', neutronToken = '';
        console.log(process.env.NEUTRON_API)
        if (process.env.NEUTRON_API && process.env.NEUTRON_TOKEN) {
            neutronApi = process.env.NEUTRON_API
            neutronToken = process.env.NEUTRON_TOKEN
            return (new GraphQLClient(neutronApi, {
                headers: { Authorization: neutronToken },
            }))
        }
        throw new Error("Something went wrong at Neutron Client")
    } catch (error) {
        // logger().error("Error in Neutron Client", { error })
        throw error;
    }
}

export const getDataFromNeutron = (query: string, transformer: any = null) => {

    const data = neutronClient().request(query);

    console.log(data)
    if (transformer)
        return transformer(data)
    else
        return data;
}




