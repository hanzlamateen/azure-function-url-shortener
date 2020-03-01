# URL Shortener Azure Function

An azure function to shorten url. The shortened url is stored in azure table storage. This azure function is written using JavaScript.

## Configurations

Please make sure to update ```CONNECTION_STRING```, ```TABLE_NAME``` constants with the azure table storage connection string and desired table name in ```AzureTableManager.js``` file.

## Usage

Use ```shorten``` query parameter to get shortened hash for long url. The response will contain a hash that you can use to get the full url back.
http://localhost:7071/api/FunctionURLShortener?shorten=www.github.com

Use ```redirect``` query parameter to get long url for shortened hash. The response will contain the full url.
http://localhost:7071/api/FunctionURLShortener?redirect=A2gFd7vE

## References

* https://dev.to/bauripalash/building-a-simple-url-shortener-with-just-html-and-javascript-16o4
* https://docs.microsoft.com/en-us/azure/cosmos-db/table-storage-how-to-use-nodejs#add-an-entity-to-a-table
