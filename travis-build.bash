#!/bin/bash
# test and publish rug archive

set -o pipefail

declare Pkg=travis-build-mkdocs
declare Version=0.3.1

function msg() {
    echo "$Pkg: $*"
}

function err() {
    msg "$*" 1>&2
}

function site-build() {
    if ! mkdocs build --strict; then
        err "mkdocs build failed"
        return 1
    fi
    
    if ! ./htmlproof.bash; then
        err "htmlproofing failed"
        return 1
    fi
}

# usage: main "$@"
function main () {
    msg "branch: $TRAVIS_BRANCH"
    
    site-build || return 1
    
    [[ $TRAVIS_PULL_REQUEST == false ]] || return 0
    
    [[ $TRAVIS_TAG =~ ^[0-9]+\.[0-9]+\.[0-9]+(-(m|rc)\.[0-9]+)?$ ]] || return 0
    
    local bucket=docs.atomist.com
    if ! s3cmd sync --guess-mime-type --delete-removed site/ "s3://$bucket/"; then
        err "failed to sync site to s3 bucket '$bucket'"
        return 1
    fi
    
    if ! git config --global user.email "travis-ci@atomist.com"; then
        err "failed to set git user email"
        return 1
    fi
    if ! git config --global user.name "Travis CI"; then
        err "failed to set git user name"
        return 1
    fi
    local tag=$TRAVIS_TAG+travis.$TRAVIS_BUILD_NUMBER
    if ! git tag "$tag" -m "Generated tag from Travis CI build $TRAVIS_BUILD_NUMBER"; then
        err "failed to create git tag: '$tag'"
        return 1
    fi
    local remote=origin
    if [[ $GITHUB_TOKEN ]]; then
        remote=https://$GITHUB_TOKEN:x-oauth-basic@github.com/$TRAVIS_REPO_SLUG.git
    fi
    if ! git push --quiet "$remote" "$tag" > /dev/null 2>&1; then
        err "failed to push git tag: '$tag'"
        return 1
    fi
}

main "$@" || exit 1
exit 0
