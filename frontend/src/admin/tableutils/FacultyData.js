const columns = [
    { name: "ID", uid: "fid", sortable: true },
    { name: "NAME", uid: "fname", sortable: true },
    { name: "AGE", uid: "age", sortable: true },
    { name: "DOB", uid: "dob" },
    { name: "EMAIL", uid: "femail" },
    { name: "DEPARTMENT", uid:"fdepartment"},
    { name: "CONTACT", uid:"fcontact"},
    { name: "STATUS", uid: "fstatus", sortable: true },
    { name: "ACTIONS", uid: "actions" }, 
  ];
  
  const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "InActive", uid: "inactive" },
  ];
  export { columns, statusOptions };
  