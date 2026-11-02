@echo off
title Mohammed Baasim H - Cybersecurity Portfolio
echo ========================================================
echo  Launching Mohammed Baasim H Portfolio Website...
echo ========================================================
start http://localhost:5500
python -m http.server 5500
if %errorlevel% neq 0 (
    echo.
    echo Opening index.html directly...
    start index.html
)
pause
