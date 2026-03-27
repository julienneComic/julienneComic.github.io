#!/usr/bin/env bash
set -euo pipefail

# Rebase the current branch onto prod/main, then push *this* branch — not a
# different local branch (e.g. local `prod`), which caused stale pushes and
# merge/rebase errors.

if [ -n "$(git status --porcelain)" ]; then
  git stash push -m "pushToProd pre-pull"
  stashed=1
else
  stashed=0
fi
git pull prod main --rebase
if [ "${stashed:-0}" -eq 1 ]; then
  git stash pop
fi
git add .
git diff --name-only --cached
echo
statusCmd="$(git status --short)"
status="${statusCmd}"
if [ -n "$status" ]; then
  echo "
Do you want to push these changes?"
  select yn in "Yes" "No"; do
    case $yn in
    Yes) break ;;
    No)
      echo "
Please remove changes to files you don't want pushed"
      exit
      ;;
    esac
  done
  read -p "What is the purpose of this push? " commitMessage
  git commit -m "$commitMessage"
fi
echo "
Where do you want to push these changes?"
select yn in "Queue" "Prod"; do
  case $yn in
  Prod)
    # Remote `prod` branch triggers GitHub Actions deploy (see .github/workflows).
    git push prod HEAD:prod
    break
    ;;
  Queue)
    # Update remote `main` without updating the deploy branch.
    git push prod HEAD:main
    break
    ;;
  esac
done
exit 0
