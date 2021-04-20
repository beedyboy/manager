import { decorate, observable, action } from "mobx";
import { createContext } from "react"; 
import { backend } from "../services/APIService";
 
class AuthStore { 
  error = null;
  message = "";
  action = "";
  link = "";
  errMessage = "";
  sending = false;  
  requestSent = false;
  passwordChanged = false;
  close = false; 
  action = null; 
 
 
 
  requestInstruction = (data) => {
    this.sending = true;
    this.error = false;
    this.requestSent = false;
    backend.post("auth/reset-request", data).then((res) => {
      this.sending = false;
      if (res.data.status === 200) { 
        this.message = res.data.message;
        this.link = res.data.link;
        this.requestSent = true;
      }  
    });
  };
 
  resetPasswordNow = (data) => {
    this.sending = true;
    this.error = false;
    this.passwordChanged = false;
    backend.post("auth/reset-password", data).then((res) => { 
      this.sending = false;
      if (res.data.status === 200) { 
        this.message = res.data.message; 
        this.passwordChanged = true;
      }  
    });
  };
 
  resetProperty = (key, value) => {
    this[key] = value;
  };
 
}
decorate(AuthStore, { 
  action: observable,
  error: observable, 
  requestSent: observable,
  passwordChanged: observable,
  sending: observable,
  message: observable,
  link: observable,
  errMessage: observable, 
  action: observable,  
  requestInstruction: action, 
  resetProperty: action,
  resetPasswordNow: action,
});

export default createContext(new AuthStore());
