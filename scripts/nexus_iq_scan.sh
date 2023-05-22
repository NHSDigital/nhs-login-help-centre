#!/bin/bash

if [[ $1 == *"codepipeline/dev-"* || $1 == *"codepipeline/ptl-"* ]]; then
    echo "Running Nexus IQ scan as this is a dev or ptl build."
    curl -L  "https://download.sonatype.com/clm/scanner/nexus-iq-cli-1.151.0-01+565-unix.zip" --output nexusiq-cli.zip
    unzip nexusiq-cli.zip
    ./nexus-iq-cli -i acc-fe -s https://nexus-iq.mgmt.signin.nhs.uk -a pipeline:$NEXUS_IQ_PASSWORD .
else
    echo "Not running Nexus IQ scan as this is not a dev or ptl build."
fi