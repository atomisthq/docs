# ~/.bashrc: executed by bash(1) for non-login shells.
echo "Welcome to the docs repo"

echo "To serve your current version of the docs, type 'serve' and then visit http://localhost:8000"
alias serve='mkdocs serve'

echo "To run a strict build and test, type 'build'"
alias build='mkdocs build --strict && htmltest'

alias ls='ls $LS_OPTIONS'
alias ll='ls $LS_OPTIONS -l'
alias l='ls $LS_OPTIONS -lA'
alias gs='git status'
