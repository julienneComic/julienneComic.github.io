#!/usr/bin/env bash
git stash
git pull prod main --rebase
git stash pop
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
    git push prod HEAD
    git push prod prod:main
    break
    ;;
  Queue)
    git push prod prod:main
    break
    ;;
  esac
done
exit 0
