#!/bin/bash

echo -e "\033[0;32mDeploying updates to Github...\033[0m"

# Build the project.
hugo --buildDrafts

# Add changes to git.
git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin content
# http://stackoverflow.com/questions/32616844/git-how-to-push-a-subdirectory-to-a-separate-branch-of-the-same-repository
# http://stackoverflow.com/questions/13756055/git-subtree-subtree-up-to-date-but-cant-push
git push origin $(git subtree split --prefix=public/ --onto=origin/master):master --force
