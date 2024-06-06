#!/bin/bash

# REPORT_ID=$2

# if [[ $1 == *"codepipeline/helpcentre-live-develop"* || $1 == *"codepipeline/helpcentre-live-master-"* || -n $FORCE_NEXUS_SCAN ]]; then
#     echo "Running Nexus IQ scan, initiator == ${1}, FORCE_NEXUS=${FORCE_NEXUS_SCAN}"

#     # Fetch nexus scanner into a temp folder (so we don't scan itself)
#     if [ ! -e /tmp/nexusiq-cli.zip ] ; then
#         curl -L  "https://download.sonatype.com/clm/scanner/nexus-iq-cli-1.151.0-01+565-unix.zip" --output /tmp/nexusiq-cli.zip
#     fi

#     unzip /tmp/nexusiq-cli.zip -d tmp
#     ./tmp/nexus-iq-cli -i "$REPORT_ID" -s https://nexus-iq.mgmt.signin.nhs.uk -a pipeline:$NEXUS_IQ_PASSWORD .
# else
#     echo "Not running Nexus IQ scan as this is not a dev or ptl build."
# fi


# # REPORT_ID=$2

# # if [[ $1 == *"codepipeline/helpcentre-live-develop"* || $1 == *"codepipeline/helpcentre-live-master-"* || -n $FORCE_NEXUS_SCAN ]]; then
#     echo "Running Nexus IQ scan, initiator == ${1}, FORCE_NEXUS=${FORCE_NEXUS_SCAN}"

#     # Fetch nexus scanner into a temp folder (so we don't scan itself)
#     if [ ! -e /tmp/nexusiq-cli.zip ] ; then
#         curl -L  "https://download.sonatype.com/clm/scanner/nexus-iq-cli-1.151.0-01+565-unix.zip" --output /tmp/nexusiq-cli.zip
#     fi

#     unzip /tmp/nexusiq-cli.zip -d tmp
#     chmod
#     ./tmp/nexus-iq-cli -i "help-centre" -s https://nexus-iq.mgmt.signin.nhs.uk -a USER:PASSWORD .
# # else
# #     echo "Not running Nexus IQ scan as this is not a dev or ptl build."
# # fi

if [[ $(uname -m) == 'arm64' ]]; then
    nexus-iq-cli -i "help-centre" -s https://nexus-iq.mgmt.signin.nhs.uk -a developer:gsJy4yJmBGhZ8F5wELju .
elif [[ $1 == *"codepipeline/dev-"* || $1 == *"codepipeline/ptl-"* ]]; then
    echo "Running Nexus IQ scan as this is a dev or ptl build."
    curl -L  "https://download.sonatype.com/clm/scanner/nexus-iq-cli-1.177.0-01+817-mac.pkg" --output nexusiq-cli.zip
    unzip nexusiq-cli.zip
    ./nexus-iq-cli -i "help-centre" -s https://nexus-iq.mgmt.signin.nhs.uk -a pipeline:gsJy4yJmBGhZ8F5wELju .
else
    echo "Not running Nexus IQ scan as this is not a dev or ptl build."
fi
