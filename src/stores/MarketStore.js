import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ; 
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy";
// import  Utility from "../shared/Storage";  
class MarketStore {
  constructor() {
    this.fetchMarket(); 
    
  }
  
    error = false;
    close = false;
    exist = false;
     loading = false;
     sending = false; 
     market = [] 

     toggleClose = () => { 
       this.close = false;
     }
    fetchMarket = () => {
      this.loading = true;
      backend.get('market').then( res => {  
      this.market = res.data;
        this.loading = false; 
      }); 
  }
  
  createMarket = (data) => {
    try {    
      this.sending = true;
      backend.post('market', data).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchMarket(); 
          Beedy('success', res.data.message) 
          this.close = true;   
        } else {
          this.error = true;
        }
        
      })  
    } catch(err) {
      if(err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg)
      }
    }  
  }

  updateMarket = (data) => {
   try {
    this.sending = true;
    backend.post('market/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchMarket();
       Beedy('success', res.data.message) 
       this.close = true;   
      } else {
        Beedy('error', res.data.message) 
      }
    })
   } catch (error) {
     console.log(error)
   }
   
 }
   removeMarket = (id) => { 
   try { 
    backend.delete('market/' + id).then( res => {
      if(res.status === 200) {
        this.fetchMarket();
        Beedy('success', res.data.message)
      } else {
        Beedy('error', res.data.message) 
      }
    })
   } catch (error) {
     console.log(error)
   }
  }
  get info() {
    return  Object.keys(this.market || {}).map(key => ({...this.market[key], uid: key})); 
  }
  get stats() {
  	return this.market.length 
  }
  get marketSelect() {
    return Object.keys(this.market || {}).map((key) => ({
      value: this.market[key].id,
      label: this.market[key].name,
    }));
  } 

} 
decorate(MarketStore, { 
  sending: observable,
  close: observable,
  error: observable,
  exist: observable,
  info: computed, 
  stats: computed, 
  marketSelect: computed, 
  loading: observable,
  market: observable, 
  createMarket: action,
  updateMarket: action,
  removeMarket: action,
  toggleClose: action
})

 
export default createContext(new MarketStore())
