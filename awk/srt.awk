#awk -v from1=00:00:41,000 -v to1=00:00:10,000 -v from2=00:41:43,000 -v to2=00:41:11,000 -f srt.awk unaligned.srt > aligned.srt
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

    match(from1,/([0-9][0-9]):([0-9][0-9]):([0-9][0-9]),([0-9][0-9][0-9])/,arr_x1);
    match(to1,/([0-9][0-9]):([0-9][0-9]):([0-9][0-9]),([0-9][0-9][0-9])/,arr_y1);
    match(from2,/([0-9][0-9]):([0-9][0-9]):([0-9][0-9]),([0-9][0-9][0-9])/,arr_x2);
    match(to2,/([0-9][0-9]):([0-9][0-9]):([0-9][0-9]),([0-9][0-9][0-9])/,arr_y2);

    x1 = convert2ms(arr_x1[1],arr_x1[2],arr_x1[3],arr_x1[4])
    y1 = convert2ms(arr_y1[1],arr_y1[2],arr_y1[3],arr_y1[4])
    x2 = convert2ms(arr_x2[1],arr_x2[2],arr_x2[3],arr_x2[4])
    y2 = convert2ms(arr_y2[1],arr_y2[2],arr_y2[3],arr_y2[4])

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
