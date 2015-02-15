#SingleInstance Force
#InstallMouseHook
#NoEnv

CoordMode, Mouse, Screen
SendMode Input

~LButton & MButton::
SendPlay , {MButton up}
SendPlay , {LButton up}
SendPlay ,  {Ctrl Down}c{Ctrl  Up}
SendPlay ,  {Ctrl Down}x{Ctrl  Up}
SendPlay , {MButton down}
SendPlay , {LButton down}
return


~LButton & RButton::
SendPlay , {MButton up}
SendPlay , {LButton up}
SendPlay , {Ctrl Down}v{Ctrl Up}
SendPlay , {MButton down}
SendPlay , {LButton down}
return

