import { decorate, observable, action, computed } from "mobx";
import { createContext } from "react";
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy";
import Utility from "../services/UtilityService"; 
class LeaveStore {
  constructor() {
    this.fetchLeave();
  }

  error = false;
  close = false;
  exist = false;
  loading = false;
  sending = false;
  leave = [];
  application = [];
  history = [];
  applications = [];
  myApplications = [];

  toggleClose = () => {
    this.close = false;
  };
  fetchLeave = () => {
    this.loading = true;
    backend.get("leave").then((res) => {
      this.leave = res.data;
      this.loading = false;
    });
  };
  fetchApplications = () => {
    this.loading = true;
    backend.get("leave/application").then((res) => {
      this.applications = res.data;
      this.loading = false;
    });
  };

  confirmLeaveType = (data) => {
    backend.get("leave/" + data + "/exist").then((res) => {
      this.exist = res.data.exist;
    });
  };

  createLeave = (data) => {
    try {
      this.sending = true;
      backend.post("leave", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchLeave();
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

  updateLeave = (data) => {
    try {
      this.sending = true;
      backend.post("leave/update", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.fetchLeave();
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
  removeLeave = (id) => {
    try {
      backend.delete("leave/" + id).then((res) => {
        if (res.status === 200) {
          this.fetchLeave();
          Beedy("success", res.data.message);
        } else {
          Beedy("error", res.data.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * my applications
   */

  getMyApplications = () => {
    this.loading = true;
    backend.get("leave/myapplication").then((res) => {
      this.myApplications = res.data;
      this.loading = false;
    });
  };

  applyForLeave = (data) => {
    try {
      this.sending = true;
      backend.post("leave/myapplication", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.getMyApplications();
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
  getApplicationById = (id) => {
    try {
      this.loading = true;
      backend
        .get("leave/application/" + id)
        .then((res) => {
          this.loading = false;
          if (res.data.status === 500) {
            Utility.logout();
          } else if (res.data.status === 200) {
            this.application = res.data.data[0];
          }
        })
        .catch((err) => {
          console.log("getApplicationById", err.code);
          console.log("getApplicationById", err.message);
          console.log("getApplicationById", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };
  getApplicationStat = (user, leave) => {
    try {
      this.loading = true;
      backend
        .get(`leave/application/stats/${user}/${leave}`)
        .then((res) => {
          this.loading = false;
          if (res.data.status === 500) {
            Utility.logout();
          } else if (res.data.status === 200) {
            this.history = res.data.data;
          }
        })
        .catch((err) => {
          console.log("getApplicationStat", err.code);
          console.log("getApplicationStat", err.message);
          console.log("getApplicationStat", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };
  toggleStatus = (data) => {
    try {
      this.sending = true;
      backend.post("leave/status", data).then((res) => {
        this.sending = false;
        if (res.data.status === 200) {
          this.getApplicationById(data.id);
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
  get info() {
    return Object.keys(this.leave || {}).map((key) => ({
      ...this.leave[key],
      uid: key,
    }));
  }
  get pendingApplications() {
    return  this.applications.filter((d) => d.status === 'Pending'); 
}
get approvedApplications() {
  return  this.applications.filter((d) => d.status === 'Accepted'); 
}
get rejectedApplications() {
  return  this.applications.filter((d) => d.status === 'Rejected'); 
}
  get stats() {
    return this.leave.length;
  }
  get leaveSelect() {
    return Object.keys(this.leave || {}).map((key) => ({
      value: this.leave[key].id,
      label: this.leave[key].leave_type,
    }));
  }
}
decorate(LeaveStore, {
  sending: observable,
  close: observable,
  error: observable,
  exist: observable,
  info: computed,
  pendingApplications: computed,
  approvedApplications: computed,
  approvedApplications: computed,
  stats: computed,
  leaveSelect: computed,
  loading: observable,
  leave: observable,
  application: observable,
  applications: observable,
  history: observable,
  myApplications: observable,
  createLeave: action,
  updateLeave: action,
  removeLeave: action,
  fetchApplications: action,
  getMyApplications: action,
  getApplicationById: action,
  getApplicationStat: action,
  applyForLeave: action,
  toggleClose: action,
});

export default createContext(new LeaveStore());
