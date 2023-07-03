const resourceName = require('./utils/resourceName.js');
const buildResponseSuccess = require('./utils/buildResponseSuccess.js');
const buildResponseError = require('./utils/buildResponseError.js');

const listItems = require('./servises/visitors/listItems.service.js');
const getItemById = require('./servises/visitors/getItemById.service.js');
const addItem = require('./servises/visitors/addItem.service.js');
const deleteItem = require('./servises/visitors/deleteItem.service.js');
const putItem = require('./servises/visitors/putItem.service.js');

exports.handler = async (event) => {
    const {httpMethod, resource} = event;


    switch (true) {
        case resource === resourceName.itemById && httpMethod === "GET":
            try{
                const {id} = event.pathParameters;
                const candidate = await getItemById(id);
                if (candidate.status === "SUCCESS") {
                    return buildResponseSuccess(candidate);
                } 
                if (candidate.status === "ERROR") {
                    return buildResponseError(candidate);
                }
            }
            catch(error){
                return {
                    error
                }   
            }
        case resource === resourceName.items && httpMethod === "POST":
            try{
                const candidate = await addItem(JSON.parse(event.body));
               
                return buildResponseSuccess(candidate);
            }
            catch(error){
                return {
                    error
                }   
            }
        case resource === resourceName.itemById && httpMethod === "DELETE":
            try{
                const {id} = event.pathParameters;
                const candidate = await deleteItem(id);
                if (candidate.status === "SUCCESS") {
                    return buildResponseSuccess(candidate);
                } 
                if (candidate.status === "ERROR") {
                    return buildResponseError(candidate);
                }
            }
            catch(error){
                return {
                    error
                }   
            }
        case resource === resourceName.itemById && httpMethod === "PUT":
            try{
                const {id} = event.pathParameters;
                const candidate = await putItem(id, JSON.parse(event.body));
                if (candidate.status === "SUCCESS") {
                    return buildResponseSuccess(candidate);
                } 
                if (candidate.status === "ERROR") {
                    return buildResponseError(candidate);
                }
                return {
                    body:  JSON.stringify(candidate),
                }
            }
            catch(error){
                return {
                    error
                }   
            }
        case resource === resourceName.items && httpMethod === "GET":
            try{
                const candidate = await listItems();
                if (candidate.status === "SUCCESS") {
                    return buildResponseSuccess(candidate);
                }
                if (candidate.status === "ERROR") {
                    return buildResponseError(candidate);
                }
            }
            catch(error){
                return {
                    error
                    
                }   
            }

        default:
            const response = {
                statusCode:404,
                body: JSON.stringify("Not Found")
            };
            return response;
    }
};
