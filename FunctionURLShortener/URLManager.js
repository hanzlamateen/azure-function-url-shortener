const AzureTableManager = require("./AzureTableManager");

async function ShortenUrl(longUrl, context) {
    longUrl = getUrlWithProtocol(longUrl);
    let hash;
    let error;

    do {
        hash = getRandom();
        error = await AzureTableManager.InsertRecord(hash, longUrl, context);
    }
    while (error && error.code === "EntityAlreadyExists");

    if (error) {
        return error;
    }
    else {
        return hash;
    }
}

async function GetActualUrl(hash, context) {
    let result = await AzureTableManager.GetRecord(hash, context);
    if (Array.isArray(result)) {
        if (result.length === 0) {
            result = new Error("Unable to find url against given address.");
        }
        else {
            result = result[0].url._;
        }
    }

    return result;
}

function getUrlWithProtocol(url) {
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if (!protocol_ok) {
        newUrl = "http://" + url;
        return newUrl;
    } else {
        return url;
    }
}

function getRandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

module.exports = {
    ShortenUrl,
    GetActualUrl
}