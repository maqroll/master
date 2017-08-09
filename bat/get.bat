@echo off
set DOWNLOADDIR=
setlocal enabledelayedexpansion
cd %DOWNLOADDIR%
set result=1
FOR %%f IN (*.torrent) DO (
    for /f "tokens=*" %%i in (%%f) do (
        set result=1
        aria2c --dht-entry-point=dht.transmissionbt.com:6881 --bt-max-peers=10 --summary-interval=600 --min-split-size=1M --listen-port=1024-1025 --enable-dht --dht-listen-port 1024-1025 --enable-color=false --seed-time=0 %%i && set result=0
    )

    if !result! EQU 0 (
        del %%f
    )
)
