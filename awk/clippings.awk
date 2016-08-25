BEGIN {
    clipping_line=0;    
    selected=0;
}

/==========/ {
    clipping_line=0;
    selected=0;
    print "\\section{}";
}

{
    clipping_line = clipping_line + 1

    if (clipping_line == 2 && $0 ~ /team/) {
        selected = 1
    }

    if (clipping_line >=4 && selected==1) {
        print $0
    }
}
