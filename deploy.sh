#!/bin/bash

# This script will push the HTML docs
# to the appropriate public repository
# serving our github pages

set -o errexit

# Let's push the generated files to the pubic repository
cd site
rm -rf .git
git init
git config user.email "travis-ci@atomist.com"
git config user.name "Travis CI"
git add .
git commit -m "Generated from ${TRAVIS_REPO_SLUG} ${TRAVIS_COMMIT}"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" 'master:master' > /dev/null 2>&1
