BEGIN{
	srand()
	
	print "time"
	for(a=0; a<5000; a++) {
		print (rand()*50)+200	
	}
}
