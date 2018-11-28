function f(a,b,x) {
    return (a*x) + b
}

function error(a,b,points) {
    e = 0
    for (k in points) {
       e += (points[k] - f(a,b,k)) ^ 2
    }
    return sqrt(e)
}
 
function stepGradient(b_current, a_current, points, learningRate) {
    b_gradient=0
    a_gradient=0
    for (j in points) {
        b_gradient += -(2/3) * (points[j] - ((a_current*j) + b_current))
        a_gradient += -(2/3) * j * (points[j] - ((a_current * j) + b_current))
    }
    new_b = b_current - (learningRate * b_gradient)
    new_a = a_current - (learningRate * a_gradient)
    r["a"] = new_a
    r["b"] = new_b
    return r
}

BEGIN {
    # exact answer
    # a=1.5
    # b=1.6666667
    real[1]=3.0
    real[2]=5.0
    real[3]=6.0

    a = 10.0
    b = 10.0
    l = 0.05
    ei = 10000

    print "a,b,error"

    for(i=0; i<15000; i++) {
        r = stepGradient(b,a,real,l)
	a = r["a"]
        b = r["b"]
	print a","b","i
        ex = error(a,b,real)
        if (ei-ex<0.000000001) break
        ei = ex
    }
}
