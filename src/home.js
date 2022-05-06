import { App } from "./classes/app";
import { Header } from "./classes/header";
import { User } from "./classes/user";

App.init();

const user = new User();
const header = new Header();
header.updateButtons(user.loggedIn);
