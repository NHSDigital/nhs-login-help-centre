#!/bin/bash

REPORT_ID=$2

if [[ $1 == *"codepipeline/helpcentre-live-develop"* || $1 == *"codepipeline/helpcentre-live-master-"* || -n $FORCE_NEXUS_SCAN ]]; then
  echo "Running Nexus IQ scan, initiator == ${1}, FORCE_NEXUS=${FORCE_NEXUS_SCAN}"

  # Fetch nexus scanner into a temp folder (so we don't scan itself)
  if [ ! -e /tmp/nexusiq-cli.jar ] ; then
    curl https://nexus.mgmt.signin.nhs.uk/repository/maven-nhsd/NexusIQ/NexusIQCLI/1.80.0-01/NexusIQCLI-1.80.0-01.jar --output /tmp/nexusiq-cli.jar
  fi

  java -jar /tmp/nexusiq-cli.jar -i "$REPORT_ID" -s https://nexus-iq.mgmt.signin.nhs.uk -a "pipeline:${NEXUS_IQ_PASSWORD}" .

else
  echo "Not running Nexus IQ scan as this is not a dev or ptl build."
fi
