use std::env;
use reqwest::{Client};
use reqwest_websocket::{Message, RequestBuilderExt, Error};
use futures_util::sink::SinkExt;
use futures_util::{TryStreamExt};
use log::*;
use std::io::Write;


async fn app(url: String, req: String) -> Result<(), Error> {
    let response = Client::default()
        .get(url)
        .upgrade()
        .send()
        .await?;


    // turn the response into a websocket stream
    let mut websocket = response.into_websocket().await?;

    // the websocket implements `Sink<Message>`.
    websocket.send(Message::Text(req.into())).await?;

    // the websocket is also a `TryStream` over `Message`s.
    while let Some(message) = websocket.try_next().await? {
        match message {
            Message::Text(text) => {
                println!("{text}")
            },
            _ => {}
        }
    }

    Ok(())
}

fn main() {
    let args: Vec<String> = env::args().collect();

    let start = std::time::Instant::now();
    env_logger::Builder::from_default_env().format(move |buf, rec| {
        let t = start.elapsed().as_secs_f32();
        writeln!(buf, "{:.03} [{}] - {}", t, rec.level(),rec.args())
    }).init();

    let rt = tokio::runtime::Runtime::new().unwrap();

    match rt.block_on(app(args[1].clone(), args[2].clone())) {
        Ok(_) => info!("Done"),
        Err(e) => error!("An error ocurred: {:?}", e),
    };}

