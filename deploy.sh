#!/bin/bash

# This script will build the HTML docs and push
# them to the appropriate public repository
# serving our github pages

set -o errexit ; set -o nounset

# Building the doc locally
mkdocs build

# Let's push the generated files to the pubic repository
cd site
git init
git config user.email ""
git config user.name "atomist-travisci"
git add .
git commit -m "Generated from ${TRAVIS_REPO_SLUG} ${TRAVIS_COMMIT}"
#git push --force --quiet "https://${GITHUB_TOKEN}@$github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1

