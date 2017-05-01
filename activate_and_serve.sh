#!/bin/bash

function die(){
  echo "$1"
  exit 1
}

. ~/.venvs/userdocs/bin/activate || die "virtual env activation failed"
pip install -r requirements.txt || die "pip install failed"
( cd rug_pygments && python setup.py install ) || die "pygments setup failed"
mkdocs build --strict || die "mkdocs build failed"
bundle exec htmlproofer ./site --alt-ignore '/.*\/atomist-logo-horiz-reversed.svg$/' || die "HTMLProofer failed"
mkdocs serve
