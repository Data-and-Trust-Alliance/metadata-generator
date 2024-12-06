#!/bin/bash

# Stop previous deployment.
sudo forever stop 0

# Remove previous build artifacts.
rm -r ./dist

# Build new deployment.
ng build

# Deploy application.
sudo forever start server.js
