@echo off
echo Installing dependencies...
call npm install

echo.
echo Starting Minecraft Activity Monitor...
echo.
echo Dashboard will be available at: http://localhost:3000
echo.

call npm start
