#!/bin/bash
# test and publish rug archive

set -o pipefail

declare Pkg=travis-build-mkdocs
declare Version=0.3.0

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

    local i
    for (( i=0; i < 4; i++ )); do
        # the logo img is added by material theme, so ignore it not having alt
        if bundle exec htmlproofer ./site --alt-ignore '/.*\/atomist-logo-horiz-reversed.svg$/' \
                  --url-ignore https://api.github.com
        then
            return 0
        else
            err "HTMLProofer attempt $i failed"
        fi
    done
    return 1
}

# usage: main "$@"
function main () {
    msg "branch: $TRAVIS_BRANCH"

    site-build || return 1

    [[ $TRAVIS_PULL_REQUEST == false ]] || return 0

    [[ $TRAVIS_TAG =~ ^[0-9]+\.[0-9]+\.[0-9]+(-(m|rc)\.[0-9]+)?$ ]] || return 0

    # redirect hack
    if ! mkdir -p site/user-guide/permissions/{github,slack}; then
        err "failed to create permission redirect directories"
        return 1
    fi
    if ! touch site/user-guide/permissions/{github,slack}/index.html; then
        err "failed to create empty permission redirect files"
        return 1
    fi

    if ! s3cmd sync --delete-removed site/ s3://docs.atomist.com/; then
        err "failed to sync site to s3"
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
