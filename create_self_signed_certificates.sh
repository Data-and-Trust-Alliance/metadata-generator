#!/bin/bash

# Installs self-signed certificates in specified directory.

CERTIFICATES_DIRECTORY=/root/certificates

sudo mkdir $CERTIFICATES_DIRECTORY
sudo openssl genrsa -out $CERTIFICATES_DIRECTORY/client-key.pem 2048
sudo openssl req -new -key $CERTIFICATES_DIRECTORY/client-key.pem -out $CERTIFICATES_DIRECTORY/client.csr
sudo openssl x509 -req -in $CERTIFICATES_DIRECTORY/client.csr -signkey $CERTIFICATES_DIRECTORY/client-key.pem -out $CERTIFICATES_DIRECTORY/client-cert.pem
