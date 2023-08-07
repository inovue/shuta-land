#!/bin/sh
# postCreateCommand.sh

echo "START Install"

sudo chown -R vscode:vscode .


echo "First of all, please execute the following command"
echo "-----------------------------------------------"
echo "git config --global user.name \"Your Name\""
echo "git config --global user.email \"Your Email\""
echo "-----------------------------------------------"

cp .env.local.example .env.local
npm i
npx playwright install --with-deps chromium

echo "FINISH Install"