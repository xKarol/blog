import "./scss/index.scss";
import { App } from "./classes/app";
import { getSeed } from "./config/seed.config";

App.init();

getSeed().then((d) => console.log(d));
