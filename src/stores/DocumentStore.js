import { decorate, observable, action, computed } from "mobx";
import { createContext } from "react";
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy";
// import  Utility from "../shared/Storage";
class DocumentStore {
  constructor() {
    this.fetchDocument();
  }

  error = false;
  close = false; 
  loading = false;
  sending = false;
  document = [];

  toggleClose = () => {
    this.close = false;
  };
  fetchDocument = () => {
    this.loading = true;
    backend.get("document").then((res) => {
      this.document = res.data;
      this.loading = false;
    });
  };
   
  createDocument = (data) => {
    try {
      this.sending = true;
      backend.post("document", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchDocument();
          Beedy("success", res.data.message);
          this.close = true;
        } else {
          this.error = true;
        }
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  updateDocument = (data) => {
    try {
      this.sending = true;
      backend.post("document/update", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchDocument();
          Beedy("success", res.data.message);
          this.close = true;
        } else {
          Beedy("error", res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  removeDocument = (id) => {
    try {
      backend.delete("document/" + id).then((res) => {
        if (res.status === 200) {
          this.fetchDocument();
          Beedy("success", res.data.message);
        } else {
          Beedy("error", res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  get info() {
    return Object.keys(this.document || {}).map((key) => ({
      ...this.document[key],
      uid: key,
    }));
  }
 
 
}
decorate(DocumentStore, {
  sending: observable,
  close: observable,
  error: observable, 
  info: computed,  
  loading: observable,
  document: observable, 
  createDocument: action,
  updateDocument: action,
  removeDocument: action,
  toggleClose: action,
});

export default createContext(new DocumentStore());
