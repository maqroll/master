# http://jonisalonen.com/2013/deriving-welfords-method-for-computing-variance/
# la media es exacta
{ 
    count[$2]++
    mean[$2] = mean[$2] + ($1 - mean[$2])/count[$2]
    oldM = M[$2]
    M[$2] = M[$2] + ($1 - M[$2])/count[$2]
    S[$2] = S[$2] + ($1 - M[$2])*($1 - oldM)
}

END { 
    for (i in mean) {
        printf "%s,%d,%d\n", i, mean[i], sqrt(count[i]>1 ? S[i]/(count[i]-1) : 0)
    } 
} 