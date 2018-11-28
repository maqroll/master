function f(a,b,x) {
	return a*x + b
}

BEGIN{
    # exact answer
    # a=1.5
    # b=1.6666667
    real[1]=3
    real[2]=5
    real[3]=6

    print "a,b,error"

    for(a=-5; a<=10; a+=.1) {
        for(b=-5; b<=10; b+=.1) {
	    error=0
            for(x=1; x<=3; x+=1) {
                error += (f(a,b,x)-real[x])^2		            		
            }
            error=sqrt(error)
		if (error<min_error) min_error=error
            print a","b","error
	}
    }
}
