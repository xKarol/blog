import { Validation } from "../classes/validation";
import { SIGN_UP } from "../constants/validation";
import { App } from "../classes/app";

App.init();
new Validation(SIGN_UP);
