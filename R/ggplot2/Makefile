all: random_points.png facets.png quantile_uniform.png quantile_normal.png histogram_uniform.png histogram_normal.png adjusted.png points_rugs.png points_color.png col.png boxplot.png dotplot.png violin.png col_factor.png

random_sample.csv:
	rm -f random_sample.csv
	echo "a,b,c,d,e,f" > random_sample.csv
	seq 3000 | awk '{print rand()*100","rand()*50","int(rand()*10)%2","rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()","int($$0)+(rand()*50)","$$0}' >> random_sample.csv

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

points_rugs.png: random_sample.csv
	< random_sample.csv head -n 100 | Rio -ge 'g + geom_point(aes(x=a,y=b)) + geom_rug(aes(x=a,y=b)) + theme_bw()' > $@

points_color.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_point(aes(x=a,y=b,color=factor(c))) + theme_bw()' > $@

adjusted.png: random_sample.csv
	< random_sample.csv head -n 100 | Rio -ge 'g + geom_point(aes(x=f,y=e)) + geom_smooth(aes(x=f,y=e)) + theme_bw()' > $@

col.png: random_sample.csv
	< random_sample.csv head -n 30 | Rio -ge 'g + geom_col(aes(x=f,y=e)) + theme_bw()' > $@

col_factor.png: random_sample.csv
	< random_sample.csv head -n 30 | Rio -ge 'g + geom_col(aes(x=f,y=e,fill=factor(c))) + theme_bw()' > $@

# TODO col stacked
boxplot.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_boxplot(aes(x=factor(c),y=a)) + theme_bw()' > $@

dotplot.png: random_sample.csv
	< random_sample.csv head -n 200 | Rio -ge 'g + geom_dotplot(aes(x=factor(c),y=a),binaxis="y",stackdir="center") + theme_bw()' > $@

violin.png: random_sample.csv
	< random_sample.csv head -n 200 | Rio -ge 'g + geom_violin(aes(x=factor(c),y=a),scale="area") + theme_bw()' > $@

# TODO ejemplo de textos, leyendas, ticks

clean:
	rm -rf random_points.png \
		random_sample.csv \
		facets.png \
		quantile_uniform.png \
		quantile_normal.png \
		histogram_uniform.png \
		histogram_normal.png \
		adjusted.png \
		points_rugs.png \
		points_color.png \
		col.png \
		boxplot.png \
		dotplot.png \
		violin.png \
		col_factor.png
