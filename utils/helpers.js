const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const deepCopy = (data) => JSON.parse(JSON.stringify(data));

function randomString(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

const compareHashedPassword = (password, encryptedPassword) =>
    bcrypt.compare(password, encryptedPassword);

const hashPassword = (password) => bcrypt.hash(password, 10);
const isValidMongooseId = (id) => mongoose.Types.ObjectId.isValid(id);

const getLocalIpAddresses = ()=>{
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    const results = {}
    let local_ipv4s =[]
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
                if(net.address.startsWith('192.168')){
                    local_ipv4s.push(net.address)
                }

            }
        }
    }
    return results
}

const getLocalServerIp = ()=>{
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    const results = {}
    let local_ipv4s =[]
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
                if(net.address.startsWith('192.168')){
                    local_ipv4s.push(net.address)
                }

            }
        }
    }
    return local_ipv4s[0];
}

module.exports = {
    deepCopy,
    randomString,
    compareHashedPassword,
    hashPassword,
    isValidMongooseId,
    getLocalIpAddresses,
    getLocalServerIp,
};
