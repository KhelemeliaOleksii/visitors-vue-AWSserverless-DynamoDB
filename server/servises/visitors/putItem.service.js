const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const getItemById = require('./getItemById.service.js');
const getNameDB = require('./getNameDB.js');

async function putItem (id, body) {
    try{
        const candidate = await getItemById(id);
        if (candidate.status === "ERROR") {
            return candidate
        }
        
        const params = {
            TableName: getNameDB(),
            Item: {
                ...candidate.data,
                ...body,
            },
        };
        const data = await docClient.put(params).promise();

        return {
            status: "SUCCESS",
            statusCode: 200,
            data: params.Item,
        };
;
    } catch (err) {
        return {
            status: "ERROR",
            errorType: "InternalServerError",
            statusCode: 500,
            trace: {
                "function" : "deleteItem",
                "line" : 19,
                "file" : "deleteItem.service.js"
            },
        }
    }
};

module.exports = putItem;