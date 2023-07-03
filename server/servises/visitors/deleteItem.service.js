const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const getItemById = require('./getItemById.service.js');
const getNameDB = require('./getNameDB.js');

async function deleteItem (id) {
    const params = {
        TableName: getNameDB(),
        Key: {
            "id": id,
        },
        
    };
    try{
        const candidate = await getItemById(id);
        if (candidate.status === "ERROR") {
            return candidate
        }
        
        await docClient.delete(params).promise();

        return candidate;
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
} 

module.exports = deleteItem;