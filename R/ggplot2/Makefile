all: random_points.png facets.png quantile_uniform.png quantile_normal.png histogram_uniform.png histogram_normal.png adjusted.png points_rugs.png points_color.png col.png boxplot.png dotplot.png violin.png col_factor.png col_aside.png density2d.png

diamonds.csv:
	curl -O 'https://raw.githubusercontent.com/tidyverse/ggplot2/master/data-raw/diamonds.csv'

random_sample.csv:
	rm -f random_sample.csv
	echo "a,b,c,d,e,f" > random_sample.csv
	seq 3000 | awk '{print rand()*100","rand()*50","int(rand()*10)%2","rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()","int($$0)+(rand()*50)","$$0}' >> random_sample.csv

random_sample2.csv: 
	echo "a,b,c,d,e,f" > random_sample2.csv
	seq 30 | awk '{print rand()*100","rand()*50","int(rand()*10)%2","rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()","int($$0)+(rand()*50)","$$0; print rand()*100","rand()*50","int(rand()*10)%2","rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()","int($$0)+(rand()*50)","$$0}' >> random_sample2.csv

random_points.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_point(aes(x=a,y=b)) + theme_bw() + labs(x="x axis", y="y axis", title="Title", subtitle="Subtitle", caption="Caption")' > $@

facets.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_point(aes(x=a,y=b)) + facet_wrap(~ c) + theme_bw()' > $@

quantile_uniform.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_qq(aes(sample=a)) + theme_bw()' > $@

quantile_normal.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_qq(aes(sample=d)) + theme_bw()' > $@

histogram_uniform.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_histogram(aes(x=b)) + stat_function(aes(x=b),fun=mean,geom="line",colour="green") + theme_bw()' > $@

histogram_normal.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_histogram(aes(x=d)) + geom_hline(aes(yintercept=mean(df$$d)),colour="green") + geom_text(aes(x=median(df$$d),y=mean(df$$d)*2,label=paste0(mean(df$$d))),colour="green") + theme_bw()' > $@

points_rugs.png: random_sample.csv
	< random_sample.csv head -n 100 | Rio -ge 'g + geom_point(aes(x=a,y=b)) + geom_rug(aes(x=a,y=b)) + theme_bw()' > $@

points_color.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_point(aes(x=a,y=b,color=factor(c))) + theme_bw() + labs(x="x axis", y="y axis", title="Title", subtitle="Subtitle", caption="Caption",color="even/odd")' > $@

adjusted.png: random_sample.csv
	< random_sample.csv head -n 100 | Rio -ge 'g + geom_point(aes(x=f,y=e)) + geom_smooth(aes(x=f,y=e)) + theme_bw()' > $@

col.png: random_sample.csv
	< random_sample.csv head -n 30 | Rio -ge 'g + geom_col(aes(x=f,y=e)) + theme_bw()' > $@

col_factor.png: random_sample.csv
	< random_sample.csv head -n 30 | Rio -ge 'g + geom_col(aes(x=f,y=e,fill=factor(c))) + theme_bw()' > $@

col_aside.png: random_sample2.csv
	< random_sample2.csv  Rio -ge 'g + geom_bar(aes(x=f,y=e,fill=factor(c)),stat="identity",position="dodge") + theme_bw()' > $@

boxplot.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_boxplot(aes(x=factor(c),y=a)) + theme_bw()' > $@

dotplot.png: random_sample.csv
	< random_sample.csv head -n 200 | Rio -ge 'g + geom_dotplot(aes(x=factor(c),y=a),binaxis="y",stackdir="center") + theme_bw()' > $@

violin.png: random_sample.csv
	< random_sample.csv head -n 200 | Rio -ge 'g + geom_violin(aes(x=factor(c),y=a),scale="area") + theme_bw()' > $@

density2d.png: diamonds.csv
	< diamonds.csv Rio -ge 'g + geom_point(aes(carat,price),alpha=0.05) + geom_density2d(aes(carat,price)) + theme_bw()' > $@

# TODO ejemplo ticks

clean:
	rm -rf random_points.png \
		random_sample.csv \
		random_sample2.csv \
		diamonds.csv \
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
		col_factor.png \
		col_aside.png \
		density2d.png
