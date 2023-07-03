const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const {randomUUID} = require('crypto'); //Crypto is part of Node.js runtime since v14.17 
const getNameDB = require('./getNameDB.js');

async function addItem (body) {
    const candidate = {
        id: randomUUID(),
        ...body,
    }
    const params = {
        TableName: getNameDB(),
        Item: candidate,
    };
    try{
        await docClient.put(params).promise();

        return {
            status: "SUCCESS",
            statusCode: 201,
            data:candidate,
        };
    } catch (err) {
        return {
            status: "ERROR",
            errorType: "InternalServerError",
            statusCode: 500,
            trace: {
                "function" : "addItem",
                "line" : 16,
                "file" : "addItem.service.js"
            },
        }
    }
} 

module.exports = addItem;