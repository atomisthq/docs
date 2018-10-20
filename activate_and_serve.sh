#!/bin/bash

function die(){
    echo "$1"
    exit 1
}

. ~/.venvs/userdocs/bin/activate || die "virtual env activation failed"
pip install -r requirements.txt || die "pip install failed"
mkdocs build --strict || die "mkdocs build failed"
./htmlproof.sh || die "HTMLProofer failed"
mkdocs serve
