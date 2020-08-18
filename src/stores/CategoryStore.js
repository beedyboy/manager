import { decorate, observable, action, computed } from "mobx"
import { createContext } from "react" ; 
import { backend } from "../services/APIService";
// import  Utility from "../shared/Storage";  
class CategoryStore {
  constructor() {
    this.fetchCategory(); 
    
  }
  
     error = false;
     message = '';
     loading = false;
     sending = false; 
     category = [] 

    fetchCategory = () => {
      this.loading = true;
      backend.get('category').then( res => {  
      this.category = res.data;
        this.loading = false; 
      }); 
  }
  
  createCat = (data) => {
    try {    
      this.sending = true;
      backend.post('category', data).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchCategory(); 
          this.message = res.data.message; 
          this.response = true;   
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

  updateCat = (data) => {
    this.sending = true;
    backend.post('category/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchCategory();
      }
    })
   
 }
   removeCategory = (id) => {
    // this.Categorys = this.Categorys.filter(Category => Category.id !== id)
    console.log(id);
    backend.delete('category/' + id).then( res => {
      if(res.status === 200) {
        this.fetchCategory();
        this.message = res.message;
        // return <Toast opens={true} type="success" message={res.message} />;
      }
    })
  }
  get info() {
   var data = []
    this.category.map(res => {
      const d = {
        id: res.id,
        name: res.name,
        description: res.description,
        created_at: res.created_at,
        updated_at: res.updated_at, 
      }
      data.push(d);
    });
    return data;
    
  }

} 
decorate(CategoryStore, { 
  sending: observable,
  message: observable,
  error: observable,
  info: computed, 
  loading: observable,
  category: observable, 
  createCat: action,
  updateCat: action,
  removeCategory: action
})

 
export default createContext(new CategoryStore())
