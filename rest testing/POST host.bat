@set /p suffix=< %1
@set body=%1
@base.bat POST -H "Content-Type: application/json" "http://jsonplaceholder.typicode.com%suffix%"  -d @%body:.req=.body% 
