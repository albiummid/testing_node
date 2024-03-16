const resWS = {
    builder: {
        success: (message, data) => {
            return {
                status: "Success",
                error: {},
                message,
                result: data,
            };
        },
        error: (message, error) => {
            return {
                status: "Error",
                error,
                message,
                result: {},
            };
        },
    },
};

module.exports = resWS;
