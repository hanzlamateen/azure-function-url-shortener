const Shortener = require("./URLManager");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const longUrl = (req.query.shorten);
    const shortUrl = (req.query.redirect);
    //const name = (req.query.name || (req.body && req.body.name));

    // If it is running in longUrl to shortUrl mode.
    if (longUrl) {
        let result = await Shortener.ShortenUrl(longUrl, context);
        if (typeof result === 'string') {
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: result
            };
        }
        else {
            context.res = {
                status: 400,
                body: result.message
            };
        }
    }
    // If it is running in shortUrl to longUrl mode.
    else if (shortUrl) {
        let result = await Shortener.GetActualUrl(shortUrl, context);
        if (typeof result === 'string') {
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: result
            };
        }
        else {
            context.res = {
                status: 400,
                body: result.message
            };
        }
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass correct query parameter."
        };
    }
}
