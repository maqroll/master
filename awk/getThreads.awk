BEGIN {
    thread_section=0;    
}

/3XMTHREADINFO / && /WebContainer : / {
    thread_section=1;
}

{
    if (thread_section==1 && $0 ~ /at com\/inditex/) {
        print $0
    }    
}

/^NULL$/ {
    thread_section=0;
    print "\n"
}