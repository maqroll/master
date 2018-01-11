@set file=%1
@identify -verbose -format "%%c" %file% > %file:.png=._uxf%
@d:\bin\gawk_3.1.6-1\bin\gawk "{ sub(/\r/,\"\"); print $0}" %file:.png=._uxf% > %file:.png=.uxf%
@del %file:.png=._uxf%
