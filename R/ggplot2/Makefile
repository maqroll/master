all: random_points.png facets.png quantile_uniform.png quantile_normal.png histogram_uniform.png histogram_normal.png

random_sample.csv:
	rm -f random_sample.csv
	echo "a,b,c,d" > random_sample.csv
	seq 3000 | awk '{print rand()*100","rand()*50","int(rand()*10)%2","rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()}' >> random_sample.csv

random_points.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_point(aes(x=a,y=b)) + theme_bw()' > $@

facets.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_point(aes(x=a,y=b)) + facet_wrap(~ c) + theme_bw()' > $@

quantile_uniform.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_qq(aes(sample=a)) + theme_bw()' > $@

quantile_normal.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_qq(aes(sample=d)) + theme_bw()' > $@

histogram_uniform.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_histogram(aes(x=b)) + theme_bw()' > $@

histogram_normal.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_histogram(aes(x=d)) + theme_bw()' > $@

clean:
	rm -rf random_points.png random_sample.csv facets.png quantile_uniform.png quantile_normal.png histogram_uniform.png histogram_normal.png
