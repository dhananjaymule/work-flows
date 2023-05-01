
import { getNeutronQueryList } from './NeutronQueryList';
import { importType } from './types';
import { getDataFromNeutron } from '@vca-integration-hub/adapters/neutron';
import { writeToKafka } from '@vca-integration-hub/adapters/kafka';
const masterDataImporter = async (type: importType, fromDate: string, skip = 0, limit = 100) => {
    // For every run do below 

    // Get the type of master data that
    // Get the query of the master data type that
    const query = getNeutronQueryList(type, fromDate, skip, limit);

    var data;
    // Call the api and get the data type
    do {
        console.log(query);
        data = await getDataFromNeutron(query)
    } while (data?.data != null && data?.data?.length == limit)

    console.log('these data will be written to Kafka')
    console.log(data)
    // post to Kafka 
    // writeToKafka(data.data, 'itsol_vca_masterdata_events', type.toString())

    // Write the logs to Cribl 


    // Write the metric to NewRelic 


}

export default masterDataImporter;