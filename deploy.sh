@echo off
REM Deployment script (deploy.cmd)

REM Define variables
set REMOTE_USER=root
set REMOTE_HOST=159.65.154.82
set REMOTE_DIR=/var/www/therepublicexchange.com
set BRANCH_TO_DEPLOY=master
set SSH_PASSWORD=YourSSHPassword

REM Use plink to execute the remote command
plink -ssh %REMOTE_USER%@%REMOTE_HOST% -pw %SSH_PASSWORD% "cd %REMOTE_DIR% && git pull origin %BRANCH_TO_DEPLOY%"

REM Install or update dependencies (if applicable)
yarn install

REM Build your project (if applicable)
yarn installs
pm2 delete FrontEnd
pm2 start yarn --interpreter bash --name FrontEnd -- starts

REM Additional production server steps...

REM Merge changes into the master branch on GitHub (optional)
REM git checkout master
REM git merge %BRANCH_TO_DEPLOY%
REM git push origin master

echo Deployment completed successfully!
