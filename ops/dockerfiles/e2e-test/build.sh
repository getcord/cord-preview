#!/bin/sh -e

# cd into directory which contains this script
cd "$(dirname $0)"

ARCHIVE="$(realpath cypress.tar.gz)"

( cd ../../.. && git archive -o "$ARCHIVE" HEAD cypress/ )

docker build \
    --no-cache \
    --build-arg GIT_COMMIT_HASH="$(git rev-parse HEAD)" \
    --tag=${DOCKER_TAG:-869934154475.dkr.ecr.eu-west-2.amazonaws.com/e2e-test-runner:latest} \
    .
