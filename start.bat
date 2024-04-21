@echo off
color 2

cd %cd%/system

node nodejscuccok.js

echo port: 5500

ping localhost -n 2 >nul
exit