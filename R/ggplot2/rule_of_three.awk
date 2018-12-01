# https://www.johndcook.com/blog/2010/03/30/statistical-rule-of-three
BEGIN{
    print "n,p"
    for(i=3;i<300;i++) {
        print i","3/i 
    }
}
