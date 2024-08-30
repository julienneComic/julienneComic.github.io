#!/bin/sh

git add .
git diff --name-only --cached
echo;
statusCmd="git status --short";
status="$statusCmd";
if [ "$status" != "\n" ]; then
  echo "\nDo you want to push these changes?"
  select yn in "Yes" "No"; do
      case $yn in
          Yes ) break;;
          No ) echo "\nPlease remove changes to files you don't want pushed"; exit;;
      esac
  done;
  read -p "\nWhat is the purpose of this push? " commitMessage;
  git commit -m "$commitMessage";
fi
read -p "\nEnter deploys to production or N to push to test." stageChanges;
if ["$stageChanges" == "N" | "$stageChanges" == "n"]; then
  git push origin HEAD
  exit 0
fi

git push prod HEAD
exit 0
