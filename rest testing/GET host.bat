@set /p suffix=< %1
@call base.bat GET https://jsonplaceholder.typicode.com/posts%suffix%