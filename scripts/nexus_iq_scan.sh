#!/bin/bash

REPORT_ID=$2

if [[ $1 == *"codepipeline/helpcentre-live-develop"* || $1 == *"codepipeline/helpcentre-live-master-"* || -n $FORCE_NEXUS_SCAN ]]; then
    echo "Running Nexus IQ scan, initiator == ${1}, FORCE_NEXUS=${FORCE_NEXUS_SCAN}"
    curl -L  "https://download.sonatype.com/clm/scanner/nexus-iq-cli-1.151.0-01+565-unix.zip" --output nexusiq-cli.zip
    unzip nexusiq-cli.zip
    ./nexus-iq-cli -i "$REPORT_ID" -s https://nexus-iq.mgmt.signin.nhs.uk -a pipeline:$NEXUS_IQ_PASSWORD .
else
    echo "Not running Nexus IQ scan as this is not a dev or ptl build."
fi