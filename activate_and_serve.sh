#!/bin/bash

function die(){
  echo "$1"
  exit 1
}

source ~/.venvs/userdocs/bin/activate || die "Env activation failed"
pip install -r requirements.txt || die "Pip install failed"
( cd rug_pygments && python setup.py install || die "Python setup failed")
mkdocs serve
