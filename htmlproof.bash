function main() {
    # This is a bug in mkdocs, combined with mkdocs-material
    # When at least one of those upgrades, try taking this out and
    # see if the "Skip to content" links are now valid
    # https://github.com/squidfunk/mkdocs-material/issues/899
    # https://github.com/mkdocs/mkdocs/issues/1655
    local INVALID_SKIP_TO_CONTENT_LINKS='/\.\.\/#/'
    
    local i
    for (( i=0; i < 4; i++ )); do
        # the logo img is added by material theme, so ignore it not having alt
        if bundle exec htmlproofer ./site --alt-ignore '/.*\/atomist-logo-horiz-reversed.svg$/' \
        --url-ignore "/api.github.com/,/jenkins.io/,$INVALID_SKIP_TO_CONTENT_LINKS"
        then
            return 0
        else
            err "HTMLProofer attempt $i failed"
            return 1
        fi
    done
}

main
