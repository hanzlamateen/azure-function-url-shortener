var azure = require('azure-storage');

const CONNECTION_STRING = "";
const TABLE_NAME = "shortener";

var tableSvc = azure.createTableService(CONNECTION_STRING);

tableSvc.createTableIfNotExists(TABLE_NAME, function (error, result, response) {
    if (!error) {
        // Table exists or created
    }
});

async function InsertRecord(hash, url, context) {
    try {
        var entGen = azure.TableUtilities.entityGenerator;
        var task = {
            PartitionKey: entGen.String(hash),
            RowKey: entGen.String(hash),
            url: entGen.String(url),
        };
        return await new Promise(function (resolve, reject) {
            tableSvc.insertEntity(TABLE_NAME, task, function (error, result, response) {
                resolve(error);
            });
        });
    }
    catch (ex) {
        context.log(ex.message, ex);
    }
}

async function GetRecord(hash, context) {
    try {
        var query = new azure.TableQuery()
            .top(1)
            .where('PartitionKey eq ?', hash);
        return await new Promise(function (resolve, reject) {
            tableSvc.queryEntities(TABLE_NAME, query, null, function (error, result, response) {
                if (error){ 
                    resolve(error);
                }
                else {
                    resolve(result.entries);
                }
            });
        });
    }
    catch (ex) {
        context.log(ex.message, ex);
    }
}

module.exports = {
    InsertRecord,
    GetRecord
}
