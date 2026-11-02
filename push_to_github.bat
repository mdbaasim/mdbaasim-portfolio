@echo off
title Push Portfolio to GitHub
echo =====================================================================
echo       Push Mohammed Baasim H Portfolio to its own GitHub Repo
echo =====================================================================
echo.
echo Make sure you have created an empty repo on GitHub (e.g. named 'portfolio')
echo at: https://github.com/new
echo.
set /p REPO_URL="Enter your GitHub repository URL (default: https://github.com/mdbaasim/portfolio.git): "
if "%REPO_URL%"=="" set REPO_URL=https://github.com/mdbaasim/portfolio.git

echo.
echo Setting remote to %REPO_URL% ...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo.
echo Pushing portfolio to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =====================================================================
    echo  SUCCESS! Your portfolio is live in its own repository:
    echo  %REPO_URL%
    echo =====================================================================
) else (
    echo.
    echo If push failed, make sure the repository exists on GitHub first:
    echo https://github.com/new
)
echo.
pause
