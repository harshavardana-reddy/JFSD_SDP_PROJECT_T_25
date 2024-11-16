const columns = [
  { name: "ID", uid: "sid", sortable: true },
  { name: "NAME", uid: "sname", sortable: true },
  { name: "AGE", uid: "age", sortable: true },
  { name: "DOB", uid: "dob" },
  { name: "EMAIL", uid: "semail" },
  { name: "DEPARTMENT", uid:"sdepartment"},
  { name: "CONTACT", uid:"scontact"},
  { name: "STATUS", uid: "sstatus", sortable: true },
  { name: "ACTIONS", uid: "actions" }, 
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "InActive", uid: "inactive" },
];
export { columns, statusOptions };
