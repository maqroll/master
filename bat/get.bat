@echo off
setlocal enabledelayedexpansion
setlocal enableextensions
set DOWNLOADDIR=
cd %DOWNLOADDIR%
set result=1
set MAX_OVERALL=0
IF DEFINED MAX_DOWNLOAD (set MAX_OVERALL=%MAX_DOWNLOAD%)
FOR %%f IN (*.torrent) DO (
    for /f "tokens=*" %%i in (%%f) do (
        set result=1
	title "%%i"
        aria2c --dht-entry-point=dht.transmissionbt.com:6881 --max-overall-download-limit=%MAX_OVERALL% --summary-interval=600 --min-split-size=1M --listen-port=1024-1025 --enable-dht --dht-listen-port 1024-1025 --enable-color=false --seed-time=0 %%i && set result=0
    )

    if !result! EQU 0 (
        del %%f
    )
)
