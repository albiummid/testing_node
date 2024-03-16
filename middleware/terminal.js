const {
    appName,
    NODE_ENV,
    PORT,
    apiURI,
    doc_url,
    api_check_url,
} = require("../app.config");

const initTerminal = () => {
    // console.clear();
    console.log(`\n\n::🔥 ${appName}'s Terminal ⚡::\n`);
    console.log(` ## App ::\t\t ${appName}`);
    console.log(` ## PORT ::\t\t ${PORT}`);
    console.log(` ## Database:: \t\t MongoDB`);
    console.log(` ## Environment :: \t ${NODE_ENV}`);
    console.log(` ## Local API URI :: \t ${apiURI}`);
    console.log(` ## API Checking URL ::\t ${api_check_url}`);
    console.log(` ## Documentation URL :: ${doc_url}\n`);
};

const clear = () => {
    console.clear();
};

module.exports = {
    initTerminal,
    clear,
};
