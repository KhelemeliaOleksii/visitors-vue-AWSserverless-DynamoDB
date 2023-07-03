function buildResponseSuccess (candidate) {
    return {
        statusCode : candidate.statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        },
        body: JSON.stringify(candidate),
    };
}

module.exports = buildResponseSuccess;