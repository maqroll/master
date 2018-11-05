all: random_points.png facets.png quantile_uniform.png quantile_normal.png histogram_uniform.png histogram_normal.png adjusted.png points_rugs.png points_color.png col.png boxplot.png dotplot.png violin.png col_factor.png col_aside.png density2d.png area.png line.png path.png dates.png path_color.png worldmap.png worldmap2.png benford.png benford2.png

population.csv:
	curl --output population.csv "https://datasource.kapsarc.org/explore/dataset/saudi-arabia-population-by-administrative-region-nationality-and-sex/download/?format=csv&timezone=Europe/Berlin&use_labels_for_header=true"

diamonds.csv:
	curl -O 'https://raw.githubusercontent.com/tidyverse/ggplot2/master/data-raw/diamonds.csv'

economics.csv:
	curl -O 'https://raw.githubusercontent.com/tidyverse/ggplot2/master/data-raw/economics.csv'

benford.png: population.csv
	cat population.csv | awk -F ';' 'NR>1{c++;o[substr($$4,1,1)]++} END{print "d,o"; for (i in o) print i","o[i]/c}' | Rio -g -e "g+geom_line(aes(x=d,y=o,color='real')) + stat_smooth(aes(x=d,y=o,color='adjusted'),method='nls',formula=y ~ a*exp(b*x),se=FALSE)+ theme_bw()" >  benford.png

benford2.png: population.csv
	cat population.csv | awk -F ';' 'NR>1{c++;o[substr($$4,1,1)]++} END{print "d,o"; for (i in o) print i","o[i]/c}' | Rio -g -e "bl <- data.frame(d=c(1,2,3,4,5,6,7,8,9),o=c(0.3,0.17,0.12,0.09,0.079,0.066,0.057,0.051,0.045)); g+geom_line(aes(x=d,y=o,color='real')) + geom_line(data=bl,aes(x=d,y=o,color='law')) + stat_smooth(aes(x=d,y=o,color='adjusted'),se=FALSE) + theme_bw()" >  benford2.png

dates.png: economics.csv
	< economics.csv Rio -ge 'g + geom_line(aes(x=as.Date(date,"%Y-%m-%d"),y=uempmed,colour="uempmed")) + geom_line(aes(x=as.Date(date,"%Y-%m-%d"),y=psavert,colour="psavert")) + scale_colour_manual("",values=c("uempmed"="red","psavert"="blue")) + labs(x="",y="Percentage") + theme_bw() + theme(legend.position=c(.25,.75))' > $@

random_sample.csv:
	rm -f random_sample.csv
	echo "a,b,c,d,e,f" > random_sample.csv
	seq 3000 | awk 'BEGIN{srand()} {print rand()*100","rand()*50","int(rand()*10)%2","rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()","int($$0)+(rand()*50)","$$0}' >> random_sample.csv

random_sample2.csv: 
	echo "a,b,c,d,e,f" > random_sample2.csv
	seq 30 | awk 'BEGIN{srand()} {print rand()*100","rand()*50","int(rand()*10)%2","rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()","int($$0)+(rand()*50)","$$0; print rand()*100","rand()*50","int(rand()*10)%2","rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()","int($$0)+(rand()*50)","$$0}' >> random_sample2.csv

random_points.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_point(aes(x=a,y=b,colour=sqrt((df$$a-50)^2 + (df$$b-25)^2))) + scale_colour_distiller(palette="Blues",name="distance") + theme_bw() + labs(x="x axis", y="y axis", title="Title", subtitle="Subtitle", caption="Caption")' > $@

path.png: random_sample.csv
	< random_sample.csv head -n 300 | Rio -ge 'g + geom_path(aes(x=a,y=b),color="gray") + theme_bw()' > $@

path_color.png: random_sample.csv
	< random_sample.csv head -n 20 | Rio -ge 'g + geom_path(aes(x=a,y=b,colour=sqrt((df[2:nrow(df),1]-df[1:nrow(df),1])^2 + (df[2:nrow(df),2]-df[1:nrow(df),2])^2))) + scale_colour_distiller(palette="Blues",name="distance",direction=1) + theme_bw()' > $@

facets.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_point(aes(x=a,y=b)) + facet_wrap(~ c) + theme_bw()' > $@

quantile_uniform.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_qq(aes(sample=a)) + theme_bw()' > $@

quantile_normal.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_qq(aes(sample=d)) + theme_bw()' > $@

histogram_uniform.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_histogram(aes(x=b,y=..density..),colour="black",fill="white") + stat_density(aes(x=b),geom="line",colour="red",linetype="dashed") + geom_vline(aes(xintercept=mean(df$$b)),colour="green") + theme_bw()' > $@

histogram_normal.png: random_sample.csv
	< random_sample.csv Rio -ge 'g + geom_histogram(aes(x=d,y=..density..),colour="black",fill="white") + stat_density(aes(x=d),geom="line",colour="red",linetype="dashed") + geom_vline(aes(xintercept=mean(df$$d)),linetype="dashed",colour="green") + geom_text(aes(x=median(df$$d),y=0.5,label=paste0(mean(df$$d))),colour="green") + theme_bw()' > $@

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

line.png: random_sample.csv
	< random_sample.csv head -n 200 | Rio -ge 'g + geom_line(aes(x=f,y=a,color=factor(c))) + theme_bw()' > $@

# TODO ejemplo de coordenadas polares
# TODO Pintar las lineas de media de las dos agrupaciones
area.png: random_sample.csv
	< random_sample.csv head -n 200 | Rio -ge 'g + geom_area(aes(x=f,y=a,color=factor(c)),alpha=0.05) + scale_color_manual("",values=c("0"="red","1"="green")) + geom_hline(aes(yintercept=jitter(mean(df[df$$c==0,]$$a))),color="red") + geom_hline(aes(yintercept=jitter(mean(df[df$$c==1,]$$a))),color="green") + theme_bw()' > $@

violin.png: random_sample.csv
	< random_sample.csv head -n 200 | Rio -ge 'g + geom_violin(aes(x=factor(c),y=a),scale="area") + theme_bw()' > $@

density2d.png: diamonds.csv
	< diamonds.csv Rio -ge 'g + geom_point(aes(carat,price),alpha=0.05) + geom_density2d(aes(carat,price)) + theme_bw()' > $@

# Rio requires input data
worldmap.png: random_sample.csv
	< random_sample.csv Rio -ge 'require("maps"); world <- map_data("world"); worldmap <- ggplot(world,aes(x=long,y=lat, group=group,fill=region)) + geom_polygon(show.legend=F) + scale_fill_grey(start=0.2,end=0.8) + guides(fill="none") + scale_y_continuous(breaks=(-2:2)*30) + scale_x_continuous(breaks=(-4:4)*45) + coord_map("ortho",orientation=c(43,8,0)) + labs(x="",y="") + theme(axis.ticks.x=element_blank(),axis.ticks.y=element_blank(),axis.text.x=element_blank(),axis.text.y=element_blank())' > $@

# Rio requires input data
worldmap2.png: random_sample.csv
	< random_sample.csv Rio -ge 'require("maps"); world <- map_data("world"); worldmap <- ggplot(world,aes(x=long,y=lat, group=group)) + geom_path() + scale_y_continuous(breaks=(-2:2)*30) + scale_x_continuous(breaks=(-4:4)*45) + coord_map("ortho",orientation=c(43,8,0)) + labs(x="",y="") + theme(axis.text.x=element_blank(),axis.text.y=element_blank(),axis.ticks.x=element_blank(),axis.ticks.y=element_blank())' > $@

# TODO ejemplo ticks

clean:
	rm -rf random_points.png \
		random_sample.csv \
		random_sample2.csv \
		diamonds.csv \
		economics.csv \
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
		density2d.png \
		area.png \
		line.png \
		path.png \
		dates.png \
		path_color.png \
		worldmap.png \
		worldmap2.png \
		population.csv \
		benford.png \
		benford2.png
