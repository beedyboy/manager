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
  emailExist = false;
  close = false; 
  action = null; 
 
 
 
  requestInstruction = (data) => {
    this.sending = true;
    this.error = null;
    backend.post("auth/reset-request", data).then((res) => {
      this.sending = false;
      if (res.data.status === 200) {
    
        this.message = res.data.message;
        this.link = res.data.link;
      }  
    });
  };
 
 
}
decorate(AuthStore, { 
  action: observable,
  error: observable, 
  sending: observable,
  message: observable,
  link: observable,
  errMessage: observable, 
  action: observable,  
  requestInstruction: action, 
});

export default createContext(new AuthStore());
