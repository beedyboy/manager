import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ;   
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy"; 

class ProductStore {
  constructor() {  
    this.fetchProduct();   
  }
  
     error = false;
     filter = 'ALL';
     close = false;
     loading = false;
     sending = false; 
     sent = false; 
     products = [] 

     setFilter = (data) => {
     	this.filter = data;
     }

     toggleClose = () => { 
      this.close = false;
    }

    fetchProduct = () => { 
    this.loading = true;
    backend.get('product').then( res => {  
      this.products = res.data;
      this.loading = false;
        
    }); 
  }
   toggleProduct = (data) => {
     backend.post('product/toggle', data).then(res => {
       if (res.data.status === 200) {
        this.fetchProduct();
       }
     })
    
  }

  createProduct = (data) => {
    try {    
      this.sending = true;
      backend.post('product', data).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchProduct(); 
          this.close = true;   
          Beedy('success', res.data.message) ;
         } else {
           Beedy('error', res.data.message) 
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

  updateProduct = (data) => {
    this.sending = true;
    backend.post('product/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchProduct();
       this.close = true;   
       Beedy('success', res.data.message) ;
      } else {
        Beedy('error', res.data.message) 
      }
    })
 }
   removeProduct = (id) => { 
    backend.delete('product/' + id).then( res => {
      if(res.status === 200) {
        this.fetchProduct();
        this.message = res.message;
      //  return <Toast opens={true} type="success" message={res.message} />;
        // Toast(true, 'success',  res.message );
      }
    })
  }
  get filteredProduct() {
    switch (this.filter) {
      case 'ALL':
        return this.products;
      case 'Active':
        return this.products.filter(s => s.status === 'Active');
      case 'Inactive':
        return this.products.filter(s => s.status === 'Inactive');
      case 'Deleted':
        return this.products.filter(s => s.section === 'Deleted');

      default:
        return this.products;
    }
  }
  get info() {
  	return {
      total: this.products.length,
      status: this.products.filter(cat => cat.status).length,
      // notstatus: this.products.filter(cat => !cat.status).length,
    }
   
  }

} 
decorate(ProductStore, { 
  close: observable,
  error: observable,
  filter: observable,
  sending: observable,
  sent: observable,
  loading: observable,
  products: observable, 
  createProduct: action, 
  updateProduct: action, 
  fetchProduct: action,
  removeProduct: action,
  toggleProduct: action,
  setFilter: action,
  filteredProduct: computed,
  info: computed,
})

 
export default createContext(new ProductStore())
