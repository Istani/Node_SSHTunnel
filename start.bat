@echo off
set test=%~d0%~p0
cd "%test:~0,-1%"

:start
git pull
node app.js
IF %ERRORLEVEL% NEQ 0 (
  goto start
)