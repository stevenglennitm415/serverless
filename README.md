This repository provides a sample serverless app that can be deployed through AWS CodePipeline.

The resulting resources include an API Gateway that acts as a proxy for a Llambda function that computes the md5 hash of the supplied input.

Access the resulting function here: https://<APIGATEWAYID>.execute-api.us-east-1.amazonaws.com/md5?input=texttohash
