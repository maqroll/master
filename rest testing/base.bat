@rem $1=method (POST,GET)
@set output=%date%.%time%.output
@set output=%output:/=.%
@set output=%output::=.%
@curl --trace-ascii traza.log -w "@curl-format.txt" -L -i -k -X %1 -sS %2 %3 %4 %5 %6 -o %output%
pause
