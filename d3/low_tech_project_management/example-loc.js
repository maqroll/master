var tasks = [
{"startDate":new Date(2013,2,15),"endDate":new Date(2013,2,16,23,59),"taskName":"GVERSAPP-32","status":"KILLED"},
{"startDate":new Date(2013,2,16),"endDate":new Date(2013,2,23,23,59),"taskName":"GVERSAPP-33","status":"KILLED"},
{"startDate":new Date(2013,2,17),"endDate":new Date(2013,2,24,23,59),"taskName":"GVERSAPP-34","status":"KILLED"},
{"startDate":new Date(2013,2,18),"endDate":new Date(2013,2,25,23,59),"taskName":"GVERSAPP-35","status":"KILLED"},
{"startDate":new Date(2013,2,19),"endDate":new Date(2013,2,26,23,59),"taskName":"GVERSAPP-36","status":"KILLED"}];

tasks.sort(function(a, b) {
    return a.endDate - b.endDate;
});
var maxDate = tasks[tasks.length - 1].endDate;
tasks.sort(function(a, b) {
    return a.startDate - b.startDate;
});
var minDate = tasks[0].startDate;

var gantt = d3.gantt();
gantt(tasks);

