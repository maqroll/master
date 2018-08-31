while read magnet_url
do
   aria2c -d /share/downloaded --dht-entry-point=dht.transmissionbt.com:6881 --min-split-size=1M --listen-port=1024-1025 --enable-dht --dht-listen-port 1024-1025 --enable-color=false --seed-time=0 --max-overall-download-limit=100K $magnet_url
done
