module.exports = async (message, data, resFunction, statusCode) => {
    return resFunction.status(statusCode).json({
        kind: "success",
        status: statusCode,
        message,
        error: null,
        result: data,
    });
};
