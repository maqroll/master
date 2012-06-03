package main

import (
    "flag"
    "net/http"
    "serieTemporal"
    "strconv"
    "time"
    "encoding/json"
    "log"
)

var msecondsPerPoint = flag.Int("msecondsPerPoint", 1000, "tamaño de la muestra")
var maxPoints = flag.Int("maxPoints", 240, "tamaño de la historia")
var serie *serieTemporal.SerieTemporal = nil

func main() {
    flag.Parse()

    serie = serieTemporal.NewSerieTemporal(*msecondsPerPoint,*maxPoints)

    go generadorMuestras(*msecondsPerPoint)

	http.Handle("/muestras", http.HandlerFunc(muestras))
    http.ListenAndServe(":8080", nil)
}

func muestras(r http.ResponseWriter, req *http.Request) {
	start, _ := strconv.ParseInt(req.FormValue("start"),10,64)
	stop, _ := strconv.ParseInt(req.FormValue("stop"),10,64)

    log.Printf("%d,%d",start,stop)
    respuesta := serie.Fetch(int64(start),int64(stop))

/*
    var resultado string = "{"

    for i,value := range respuesta {
        if value.Seconds != 0 {
            resultado = resultado + strconv.FormatFloat(float64(value.Value),'f',2,32)
            if i != len(respuesta)-1 {
                resultado = resultado + ","
            }
        }
    }

    resultado = resultado + "}"

    r.Write([]byte(resultado))
    */
    b,_ := json.Marshal(respuesta)
    r.Header().Add("Access-Control-Allow-Origin","*")
    r.Write(b)
}

func generadorMuestras(step int /* en msegundos*/) {
    ticker := time.NewTicker(time.Duration(int64(1e6)*int64(step)));
    var i float32 = 0

    defer ticker.Stop()

    for _ = range ticker.C {
        serie.UpdateNow(i)
        i++
        if i > 120 {
            i = 0
        }
    }

    return;
}

