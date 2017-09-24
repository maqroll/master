@set /p suffix=< %1
@base.bat POST http://jsonplaceholder.typicode.com%suffix% 