const Utility = {
  save: (key, value) => {
    localStorage.setItem(key, value);
  },
  get: (key) => {
    return localStorage.getItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  logout: () => {
    localStorage.removeItem("staff_token");
    localStorage.removeItem("name");
    localStorage.removeItem("acl");
    window.location.href = "/sign-in";
  },
  canAccess: (key, priviledge) => {
    let access = Utility.get("acl");
    let acl;
    if (access && access.length > 0 && access !== "null") {
      acl = JSON.parse(access);
     if (acl[key] === undefined) {
       return false;
     } else {
       return acl[key][priviledge];
     } 
    }
    return false;
  },
};
module.exports = Utility;

// export function invoice() { return localStorage.getItem('receiptNumber')}
