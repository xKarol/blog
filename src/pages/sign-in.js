import { Validation } from "../classes/validation";
import { SIGN_IN } from "../constants/validation";
import { App } from "../classes/app";

App.init();
new Validation(SIGN_IN);
