@set file=%1
@d:\Chocolatey\bin\convert -comment @%file% %file:.uxf=.png% %file:.uxf=._png%
@move /Y %file:.uxf=._png% %file:.uxf=.png%
