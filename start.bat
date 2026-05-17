@echo off
title Ung Dung Ve Toan - Khoi Dong
color 0A
echo.
echo  ========================================
echo    UNG DUNG VE HINH TOAN - KHOI DONG
echo  ========================================
echo.
echo  [1/2] Dang khoi dong Backend Server (port 3001)...
start "Backend Server" cmd /k "node server.js"
timeout /t 2 /nobreak > nul

echo  [2/2] Dang khoi dong Frontend Vite (port 5173)...
start "Frontend Vite" cmd /k "npm run dev"
timeout /t 3 /nobreak > nul

echo.
echo  ========================================
echo    DA KHOI DONG XONG!
echo.
echo    Mo trinh duyet tai:
echo    http://localhost:5173
echo  ========================================
echo.
start http://localhost:5173
