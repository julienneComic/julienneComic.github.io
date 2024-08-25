#!/bin/sh

git add .
git diff --name-only --cached

echo "\nDo you want to push these changes?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) break;;
        No ) echo "\nPlease remove changes to files you don't want pushed"; exit;;
    esac
done

echo "\nWhat is the purpose of this push"
read commitMessage
while true; do
    read -p "Do you wish to install this program? " yn
    case $yn in
        [Yy]* ) make install; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

git commit -m "$commitMessage"

echo "\nEnter pushes to production or N to push to test."

if ["$stageChanges" == "N" | "$stageChanges" == "n"]; then
  git push origin HEAD
  exit 0
fi

git push prod HEAD
exit 0
