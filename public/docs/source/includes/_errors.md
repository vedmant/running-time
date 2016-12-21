# Errors


The Jogging Time API uses the following error codes:


Error Code | Meaning
---------- | -------
400 | Bad Request -- Your request sucks
401 | Unauthorized -- Your API key is wrong
403 | Forbidden -- This request is forbidden for your user
404 | Not Found -- The record was not found
405 | Method Not Allowed -- Invalid method for request
406 | Not Acceptable -- You requested a format that isn't json
422 | Validation error -- Your data has not passed validation
429 | Too Many Requests -- Too many requests
500 | Internal Server Error -- We had a problem with our server. Try again later
503 | Service Unavailable -- We're temporarially offline for maintanance. Please try again later
