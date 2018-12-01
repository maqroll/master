# https://www.johndcook.com/blog/2010/07/13/lincoln-index/
BEGIN{
    print "a,b,s,bugs"
    for (s=0.1; s<0.99; s+=.1) {
    	for (a=1; a<100; a+=10) {
    	    for (b=1; b<100; b+=10) {
                m = (a < b)? a : b
		c = (m*s == int(m*s))? int(m*s) : int(m*s)+1
                t = (a * b)/c
                print a","b","s","t
            }
        }
    }
}             
