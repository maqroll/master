all: random_points.png facets.png quantile_uniform.png \
	quantile_normal.png histogram_uniform.png histogram_normal.png \
	adjusted.png points_rugs.png points_color.png \
	col.png boxplot.png dotplot.png violin.png \
	col_factor.png col_aside.png density2d.png \
	area.png line.png path.png \
	dates.png path_color.png worldmap.png \
	worldmap2.png benford.png benford2.png \
	benford3.png benford4.png coins.png \
	thepoweroftwochoices.png shuffle.png gradient.png \
	lincoln.png rule_of_three.png dist.png \
	latencias_avg.png latencias_min.png latencias_max.png \
	histogram.png

dist.png: 
	awk -f tiempos.awk | Rio -ge 'g <- ggplot(df,aes(time)) + geom_density() + scale_x_continuous(limits=c(100,500),minor_breaks=seq(110,490,by=10)) + xlab("time (ms)") + theme_bw()' > $@

gradient.csv:
	awk -f gradient.awk > $@

gradient2.csv:
	awk -f gradient2.awk > $@

gradient.png: gradient.csv gradient2.csv
	< gradient.csv Rio -ge 'df2<-read.csv("/data/gradient2.csv",header=T,sep=',',stringsAsFactors=F); ggplot(data=df,aes(x=a,y=b,z=error)) + stat_contour(binwidth=1,aes(color=..level..)) + geom_path(data=df2,aes(a,b),color="red")' > $@

rule_of_three.csv:
	awk -f rule_of_three.awk > $@

rule_of_three.png: rule_of_three.csv
	< rule_of_three.csv Rio -ge "g <- ggplot(df,aes(n,p)) + geom_area() + theme_bw()" > $@

lincoln.csv:
	awk -f lincoln.awk > $@

lincoln.png: lincoln.csv
	< lincoln.csv Rio -ge "g <- ggplot() + geom_contour(data=df,aes(x=a,y=b,z=bugs,color=..level..)) + facet_wrap(~ s) + theme_bw();" > $@

shuffle.csv: 
	seq 48 | awk 'BEGIN{print "pos,card,iter"} {c[$$0]=$$0; o[$$0]=$$0;print $$0","$$0",0"} END{for(i=1;i<=21;i++){for(j=1;j<=24;j++){c[2*j]=o[j]} for(j=1;j<=24;j++){c[2*j-1]=o[j+24]} for(j=1;j<=48;j++){print j","c[j]","i} for(j=1;j<=48;j++){o[j]=c[j]}}}' > $@

shuffle.png: shuffle.csv
	< shuffle.csv Rio -ge 'g + geom_point(aes(x=pos,y=iter,color=factor(card))) + scale_color_grey(start=1,end=0) + theme_bw()' > $@

# Tasks duplicated (more than one line per task)
project_estimation.csv:
	curl --output project_estimation.csv --compressed "https://raw.githubusercontent.com/Derek-Jones/SiP_dataset/master/Sip-task-info.csv" 

population.csv:
	curl --output population.csv --compressed "https://datasource.kapsarc.org/explore/dataset/saudi-arabia-population-by-administrative-region-nationality-and-sex/download/?format=csv&timezone=Europe/Berlin&use_labels_for_header=true"

diamonds.csv:
	curl -O 'https://raw.githubusercontent.com/tidyverse/ggplot2/master/data-raw/diamonds.csv'

thepoweroftwochoices.csv:
	echo  "bucket,hits,method" > $@
	seq 400 | awk 'BEGIN{srand()} {a=rand()*10; t[int(a)]++} END{for (i in t) print i","t[i]",1"}' | sort >> $@
	seq 400 | awk 'BEGIN{srand()} {f=int(rand()*10); j=int(rand()*10); if (t[f]<t[j]) {t[f]++} else {t[j]++}} END{for (i in t) print i","t[i]",2"}' | sort >> $@

thepoweroftwochoices.png: thepoweroftwochoices.csv
	< thepoweroftwochoices.csv  Rio -ge 'g + geom_bar(aes(x=bucket,y=hits,fill=factor(method,levels=c(1,2),labels=c("Simple","2 choices"))),stat="identity",position="dodge") + labs(fill="method") + theme_bw()' > $@

economics.csv:
	curl -O 'https://raw.githubusercontent.com/tidyverse/ggplot2/master/data-raw/economics.csv'

benford_summary.csv: population.csv
	cat population.csv | awk -F ';' 'NR>1{c++;o[substr($$4,1,1)]++} END{print "d,o"; for (i in o) print i","o[i]/c}' > $@

coins.csv:
	seq 1000 | awk 'BEGIN{srand(); print "tosses,crosses"} {if (rand()>0.5) crosses++; tosses++; print tosses","crosses/tosses*100}' > $@

# TPMT (J. Ellenberg) chapter 4
coins.png: coins.csv
	< coins.csv Rio -g -e 'g + geom_line(aes(x=tosses,y=crosses)) + geom_hline(aes(yintercept=50),linetype="dashed",colour="red") + theme_bw()' > $@

benford.png: benford_summary.csv
	< benford_summary.csv  Rio -g -e "g+geom_line(aes(x=d,y=o,color='real')) + stat_smooth(aes(x=d,y=o,color='adjusted'),formula=y ~ x,se=FALSE,linetype='dashed')+ theme_bw()" > $@

benford2.png: benford_summary.csv
	< benford_summary.csv Rio -g -e "bl <- data.frame(d=c(1,2,3,4,5,6,7,8,9),o=c(0.3,0.17,0.12,0.09,0.079,0.066,0.057,0.051,0.045)); g+geom_line(aes(x=d,y=o,color='real')) + geom_line(data=bl,aes(x=d,y=o,color='law')) + geom_ribbon(aes(x=bl[,c('d')],ymin=bl[,c('o')],ymax=df[,c('o')]),fill='gray',alpha=0.2) + theme_bw();" > $@

benford3.png: benford_summary.csv
	< benford_summary.csv Rio -g -e "g <- ggplot(df,aes(x=d,y=o)) + geom_line() + scale_x_continuous(breaks=c(1,2,3,4,5,6,7,8,9)) + coord_polar(theta='x') + theme_bw();" > $@

benford4.png: benford_summary.csv
	< benford_summary.csv Rio -g -e "g + geom_col(aes(x=d,y=o,fill=factor(d)),width=1) + scale_x_continuous(breaks=c(1,2,3,4,5,6,7,8,9)) + coord_polar(theta='x') + theme_bw();" > $@

dates.png: economics.csv
	< economics.csv Rio -ge 'g + geom_line(aes(x=as.Date(date,"%Y-%m-%d"),y=uempmed,colour="uempmed")) + geom_line(aes(x=as.Date(date,"%Y-%m-%d"),y=psavert,colour="psavert")) + scale_colour_manual("",values=c("uempmed"="red","psavert"="blue")) + labs(x="",y="Percentage") + theme_bw() + theme(legend.position=c(.25,.75))' > $@

latencias_avg.png: latencias.txt
	awk -F, 'NR==1{print $$0} NR>1&&$$5<20{print $$0}' latencias.txt | Rio -ge 'require("scales"); g + geom_line(aes(x=as.POSIXct(fecha),y=avg,colour=factor(inst))) + scale_x_datetime(labels=date_format("%Y-%m-%d")) + scale_y_continuous(limits=c(0,20),minor_breaks=seq(0,20,by=2)) + geom_hline(aes(yintercept=jitter(mean(df[df$$inst==1,]$$avg))),colour="red",linetype="dotted") + geom_hline(aes(yintercept=jitter(mean(df[df$$inst==24,]$$avg))),colour="green",linetype="dashed") + theme_bw()' > $@

latencias_min.png: latencias.txt
	awk -F, 'NR==1{print $$0} NR>1&&$$4<20{print $$0}' latencias.txt | Rio -ge 'require("scales"); g + geom_line(aes(x=as.POSIXct(fecha),y=min,colour=factor(inst))) + scale_x_datetime(labels=date_format("%Y-%m-%d")) + scale_y_continuous(limits=c(0,20),minor_breaks=seq(0,20,by=2)) + geom_hline(aes(yintercept=jitter(mean(df[df$$inst==1,]$$min))),colour="red",linetype="dotted") + geom_hline(aes(yintercept=jitter(mean(df[df$$inst==24,]$$min))),colour="green",linetype="dashed") + theme_bw()' > $@

latencias_max.png: latencias.txt
	awk -F, 'NR==1{print $$0} NR>1&&$$6<20{print $$0}' latencias.txt | Rio -ge 'require("scales"); g + geom_line(aes(x=as.POSIXct(fecha),y=max,colour=factor(inst))) + scale_x_datetime(labels=date_format("%Y-%m-%d")) + scale_y_continuous(limits=c(0,20),minor_breaks=seq(0,20,by=2)) + geom_hline(aes(yintercept=jitter(mean(df[df$$inst==1,]$$max))),colour="red",linetype="dotted") + geom_hline(aes(yintercept=jitter(mean(df[df$$inst==24,]$$max))),colour="green",linetype="dashed") + theme_bw()' > $@

random_sample.csv:
	rm -f random_sample.csv
	echo "a,b,c,d,e,f" > $@
	seq 3000 | awk 'BEGIN{srand()} {print rand()*100","rand()*50","int(rand()*10)%2","rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()","int($$0)+(rand()*50)","$$0}' >> $@

random_sample2.csv: 
	echo "a,b,c,d,e,f" > random_sample2.csv
	seq 30 | awk 'BEGIN{srand()} {print rand()*100","rand()*50","int(rand()*10)%2","rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()","int($$0)+(rand()*50)","$$0; print rand()*100","rand()*50","int(rand()*10)%2","rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()+rand()","int($$0)+(rand()*50)","$$0}' >> $@

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

histogram.png: project_estimation.csv
	< project_estimation.csv Rio -ge 'df$$blowup <- log(df$$HoursActual/df$$HoursEstimate); df <- df[df$$HoursEstimate > 7, ]; ggplot(data=df) + geom_histogram(data=df,aes(x=blowup,y=..density..),binwidth=0.2,colour="black",fill="white") + theme_bw()' > $@

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

clean:
	rm -rf *.png
	rm -rf *.csv
