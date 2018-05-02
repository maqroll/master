function convert2ts(ms,a,b) {
    ms = (ms*a) + b;
    hours = int(ms/hours2ms);
    minutes = int( (ms - (hours*hours2ms))/minutes2ms );
    seconds = int( (ms - (hours*hours2ms) - (minutes*minutes2ms))/seconds2ms );
    millis = ms - (hours*hours2ms) - (minutes*minutes2ms) - (seconds*seconds2ms);
    return sprintf("%02d:%02d:%02d,%03d",hours,minutes,seconds,millis);
}

function convert2ms(hours,minutes,seconds,ms) {
    return hours*hours2ms + minutes*minutes2ms + seconds*seconds2ms + ms;
}

BEGIN{
    seconds2ms = 1000;
    minutes2ms = 60000;
    hours2ms = 3600000;

    # TODO
    x1 = convert2ms(0,0,26,533);
    y1 = convert2ms(0,0,7,716);
    x2 = convert2ms(0,41,28,144);
    y2 = convert2ms(0,41,8,216);

    a = (y2 - y1)/(x2 - x1);
    b = y2 - (a*x2)
}

match($0,/([0-9][0-9]):([0-9][0-9]):([0-9][0-9]),([0-9][0-9][0-9]) --> ([0-9][0-9]):([0-9][0-9]):([0-9][0-9]),([0-9][0-9][0-9])/,m){
    print convert2ts(convert2ms(m[1],m[2],m[3],m[4]),a,b) " --> " convert2ts(convert2ms(m[5],m[6],m[7],m[8]),a,b);         
    next;
}

{
    print $0;
}
