benchmark <- read.csv("benchmark.txt",sep=" ")
usl <- nls(tput ~ lambda*size/(1+sigma*(size-1) + kappa*size*(size-1)),benchmark,start=c(sigma=0.1,kappa=0.01,lambda=1000))
summary(usl)
f <- lm(mean ~ size,data=benchmark)
summary(f)
sigma <- coef(usl)['sigma']
kappa <- coef(usl)['kappa']
lambda <- coef(usl)['lambda']
b <-  coef(f)['(Intercept)']
a <-  coef(f)['size']
u=function(x){y=x*lambda/(1+sigma*(x-1)+kappa*x*(x-1))}
t=function(x){y=x*a + b}
plot(u,0,max(benchmark$size)*1.25,xlab="Size",ylab="Throughput",lty="dashed")
points(benchmark$size,benchmark$tput)
plot(t,0,max(benchmark$size)*1.25,xlab="Size",ylab="Mean time",lty="dashed")
points(benchmark$size,benchmark$mean)
