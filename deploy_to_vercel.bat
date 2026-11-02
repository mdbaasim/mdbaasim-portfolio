@echo off
title Deploy Portfolio to Vercel
echo ========================================================
echo    Deploying mdbaasim-portfolio to Vercel
echo ========================================================
echo.
cd /d "%~dp0"

echo Running Vercel Production Deploy...
call npx --yes vercel --prod

echo.
echo ========================================================
echo    Deployment finished! Check your live link above.
echo ========================================================
pause
