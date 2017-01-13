#!/usr/bin/env bash

travis_tag=$1

release_version_regex="^[0-9]+\\.[0-9]+\\.[0-9]+$"

# Test: on release, we don't display the github url
if [[ ${travis_tag} =~ ${release_version_regex} ]]
then
  if grep -q '^repo_url:' mkdocs.yml
  then
    echo "Error! You're not supposed to release a version with repo_url defined in mkdocs.yml"
    echo "That makes the Github link visible on the upper right of each page. We want that between releases, but not during."
    exit 1
  fi
fi