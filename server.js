const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');
const CosmosClient = require('@azure/cosmos').CosmosClient;
const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Redirect http traffic to https.
const httpApp = express();

httpApp.get("/*", function(req, res) {
    res.redirect("https://" + req.headers.host);
});

http.createServer(httpApp).listen(80, function() {
    console.log("HTTP server listening on port 80");
});

// Create https server.
//var privateKey  = fs.readFileSync('/root/certificates/client-key.pem', 'utf8');
//var certificate = fs.readFileSync('/root/certificates/client-cert.pem', 'utf8');

var privateKey  = fs.readFileSync('/etc/letsencrypt/live/data-and-trust-alliance-data-provenance-standards.northeurope.cloudapp.azure.com/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/data-and-trust-alliance-data-provenance-standards.northeurope.cloudapp.azure.com/fullchain.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

const httpsApp = express();

httpsApp.use(express.static(__dirname + '/dist/data-and-trust-alliance-standards/browser'));
httpsApp.use(bodyParser.json());
httpsApp.use(cors());

httpsApp.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname, '/dist/data-and-trust-alliance-standards/browser/index.html'));
});

httpsApp.post('/save', async function(req,res) {
  const dataToStore = req.body;

  storeEntity(dataToStore);

  res.send(
    {
      message: 'JSON Stored in DB.',
    }
  );
});

https.createServer(credentials, httpsApp).listen(443, function() {
    console.log("HTTPS server listening on port 443");
});

// Cosmos DB functionality.
const endpoint = config.endpoint;
const key = config.key;

const databaseId = config.database.id;
const containerId = config.container.id;

const options = {
  endpoint: endpoint,
  key: key,
  userAgentSuffix: 'DataAndTrustAllianceUser'
};

const client = new CosmosClient(options);

async function storeEntity(dataToStore) {
  const client = new CosmosClient(options);

  const { entity } = await client
    .database(databaseId)
    .container(containerId)
    .items.upsert(dataToStore)
  console.log(`Created entity with id:\n${dataToStore.id}\n`)
};
