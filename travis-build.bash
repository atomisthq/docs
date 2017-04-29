#!/bin/bash
# test and publish rug archive

set -o pipefail

declare Pkg=travis-build-mkdocs
declare Version=0.1.0

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

    # the logo img is added by material theme, so ignore it not having alt
    if ! bundle exec htmlproofer ./site --alt-ignore '/.*\/atomist-logo-horiz-reversed.svg$/'; then
        err "HTMLProofer failed"
        return 1
    fi
}

# usage: main "$@"
function main () {
    msg "branch: $TRAVIS_BRANCH"

    site-build || return 1

    [[ $TRAVIS_PULL_REQUEST == false ]] || return 0

    local version_file=VERSION
    local project_version
    project_version=$(<$version_file)
    if [[ $? -ne 0 || ! $project_version ]]; then
        err "failed to determine current version from $version_file"
        return 1
    fi
    if [[ $TRAVIS_TAG =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        if [[ $project_version != $TRAVIS_TAG ]]; then
            err "project version ($project_version) does not match git tag ($TRAVIS_TAG)"
            return 1
        fi
        project_version=$TRAVIS_TAG
    elif [[ $TRAVIS_BRANCH == master ]]; then
        local timestamp
        timestamp=$(date +%Y%m%d%H%M%S)
        if [[ $? -ne 0 || ! $timestamp ]]; then
            err "failed to generate timestamp: $timestamp"
            return 1
        fi
        project_version=$project_version-$timestamp
    else
        return 0
    fi
    msg "doc version: $project_version"

    if ! rm site/CNAME; then
        err "failed to remove CNAME for staging publish"
        return 1
    fi
    if ! bash deploy.bash "$TRAVIS_REPO_SLUG"; then
        err "failed to deploy staging site"
        return 1
    fi
    if ! cp docs/CNAME site/CNAME; then
        err "failed to restore CNAME file"
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
    local git_tag=$project_version+travis$TRAVIS_BUILD_NUMBER
    if ! git tag "$git_tag" -m "Generated tag from TravisCI build $TRAVIS_BUILD_NUMBER"; then
        err "failed to create git tag: $git_tag"
        return 1
    fi
    if ! git push --quiet --tags "https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG" > /dev/null 2>&1; then
        err "failed to push git tags"
        return 1
    fi
}

main "$@" || exit 1
exit 0
