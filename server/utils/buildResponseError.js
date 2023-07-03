function buildResponseError(candidate) {
    return {
        statusCode: candidate.statusCode,
        headers: {
            "Access-Controll-Allow-Origin": "http://localhost:8080/",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(candidate),
    }
}

module.exports = buildResponseError;