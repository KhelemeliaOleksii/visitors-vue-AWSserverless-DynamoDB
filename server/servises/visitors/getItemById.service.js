const AWS = require('aws-sdk');
const isObjectEmpty = require('../../utils/isObjectEmpty.js');
const getNameDB = require('./getNameDB.js');


const docClient = new AWS.DynamoDB.DocumentClient();

async function getItemById (id) {
    const params = {
        TableName: getNameDB(),
        Key: {
            "id": id,
        },
        
    };
    try{
        const candidate = await docClient.get(params).promise();
        const {Item:data} = candidate;
        if (!data) {
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
        };

    } catch (err) {
        return {
            status: "ERROR",
            errorType: "InternalServerError",
            statusCode: 500,
            trace: {
                "function" : "getItemById",
                "line" : 17,
                "file" : "getItemById.service.js"
            },
        }
    }
} 

module.exports = getItemById;

