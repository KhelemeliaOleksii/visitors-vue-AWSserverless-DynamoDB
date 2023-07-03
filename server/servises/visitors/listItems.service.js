const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const getNameDB = require('./getNameDB.js');
const params = {
    TableName: getNameDB(),
}

async function listItems () {
    try{
        const candidate = await docClient.scan(params).promise();
        const {Items:data} = candidate;
        if (data.length === 0) {
            return {
                status: "ERROR",
                errorType: "RequestError",
                statusCode: 404,
            }
        }
        return {
            status: "SUCCESS",
            statusCode: 200,
            data,
        }
    } catch (err) {
        return {
            status: "ERROR",
            errorType: "InternalServerError",
            statusCode: 500,
            trace: {
                "function" : "listItems",
                "line" : 10,
                "file" : "listItems.service.js"
            },
        }
    }
} 

module.exports = listItems;