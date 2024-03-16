module.exports = {
    wsAuthMiddleware: (socket, next) => {
        const { user_id, session_token, device_token } = socket.handshake.auth;
        if ([user_id, session_token, device_token].some(!Boolean)) {
            console.log(
                user_id,
                session_token,
                device_token,
                "Something  MISSING"
            );

            const err = new Error(
                "Authorization failure: AUTH_PARAMETERS_ARE_MISSING"
            );
            err.data = {
                parameters: ["user_id", "session_token", "device_token"],
            };

            return next(err); // client got this error in 'connect_error' event
        }

        //TODO: validate auth parameters
        next();
    },
};
