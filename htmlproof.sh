#!/bin/bash

function msg() {
    echo "$Pkg: $*"
}

function err() {
    msg "$*" 1>&2
}

function main() {
    # This is a bug in mkdocs, combined with mkdocs-material
    # When at least one of those upgrades, try taking this out and
    # see if the "Skip to content" links are now valid
    # https://github.com/squidfunk/mkdocs-material/issues/899
    # https://github.com/mkdocs/mkdocs/issues/1655
    local invalid_skip_to_content_links='/\.\.\/#/'
    
    local font_loading_preconnect_from_material="https://fonts.gstatic.com"
    
    local jenkins_does_not_accept_connections_from_travis="/jenkins.io/"
    
    local i
    for (( i=0; i < 4; i++ )); do
        # the logo img is added by material theme, so ignore it not having alt
        if bundle exec htmlproofer ./site --alt-ignore '/.*\/atomist-logo-horiz-reversed.svg$/' \
        --url-ignore "/api.github.com/,$jenkins_does_not_accept_connections_from_travis,$invalid_skip_to_content_links,$font_loading_preconnect_from_material"
        then
            return 0
        else
            err "HTMLProofer attempt $i failed"
            return 1
        fi
    done
}

main
