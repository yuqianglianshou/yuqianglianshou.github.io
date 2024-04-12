REM 指定utf-8编码
chcp 65001

@echo off
echo 正在启动 Jekyll 服务，请稍候...

REM 检查是否已经存在 jekyll 服务
netstat -ano | findstr :4000 > nul
IF %ERRORLEVEL% NEQ 0 (
    REM 如果不存在，启动服务
    jekyll serve
) ELSE (
    echo Jekyll 服务已经在运行中.
)

pause