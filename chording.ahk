
<!-- saved from url=(0077)https://bitbucket.org/papaventos/ailaleailalalo/raw/4fc66ec400ea/chording.ahk -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">#SingleInstance Force
#InstallMouseHook
#NoEnv

CoordMode, Mouse, Screen
SendMode Input

~LButton &amp; MButton::
SendPlay , {MButton up}
SendPlay , {LButton up}
SendPlay ,  {Ctrl Down}c{Ctrl  Up}
SendPlay ,  {Ctrl Down}x{Ctrl  Up}
SendPlay , {MButton down}
SendPlay , {LButton down}
return


~LButton &amp; RButton::
SendPlay , {MButton up}
SendPlay , {LButton up}
SendPlay , {Ctrl Down}v{Ctrl Up}
SendPlay , {MButton down}
SendPlay , {LButton down}
return

</pre></body><style>undefined</style><style>undefined</style></html>