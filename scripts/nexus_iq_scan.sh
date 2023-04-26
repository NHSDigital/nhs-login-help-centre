#!/bin/bash

REPORT_ID=$2

for D in ./wheels "${@:3}" ; do
  echo "deps : $D"
done

echo $1
if [[ $1 == *"codepipeline/helpcentre-live-develop"* || $1 == *"codepipeline/helpcentre-live-master-"* || -n $FORCE_NEXUS_SCAN ]]; then
  echo "Running Nexus IQ scan, initiator == ${1}, FORCE_NEXUS=${FORCE_NEXUS_SCAN}"

  # Copy python wheels into a folder to scan
  mkdir -p wheels
  python scripts/collect_wheels.py
  # any bespoke scan code goes here
  source ./scripts/nexus_iq_scan_extras.sh
  cat nexus-wheels.txt | uniq


  # Fetch nexus scanner into a temp folder (so we don't scan itself)
  if [ ! -e /tmp/nexusiq-cli.jar ] ; then
    curl https://nexus.mgmt.signin.nhs.uk/repository/maven-nhsd/NexusIQ/NexusIQCLI/1.80.0-01/NexusIQCLI-1.80.0-01.jar --output /tmp/nexusiq-cli.jar
  fi

  java -jar /tmp/nexusiq-cli.jar -i "$REPORT_ID" -s https://nexus-iq.mgmt.signin.nhs.uk -a "pipeline:${NEXUS_IQ_PASSWORD}" ./wheels "${@:3}"

else
  echo "Not running Nexus IQ scan as this is not a dev or ptl build."
fi
