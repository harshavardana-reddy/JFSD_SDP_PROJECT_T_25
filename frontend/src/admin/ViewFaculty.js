import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  Input
} from "@nextui-org/react";
import axios from "axios";
import exportFromJSON from "export-from-json";
import React,{ useCallback, useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import BackendURLS from "../config";
import { columns, statusOptions } from "./tableutils/FacultyData";
import { VerticalDotsIcon } from "./tableutils/VerticalDotsIcon";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from './tableutils/ChevRonDownIcon';
import { SearchIcon } from './tableutils/SearchIcon';
import { PlusIcon } from './tableutils/PlusIcon';
import { capitalize } from "./tableutils/utils";

const statusColorMap = {
  active: "success",
  inactive: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["ID", "NAME", "DEPARTMENT", "STATUS", "PROFILE", "ACTIONS"];

export default function ViewFaculty() {
  const [filterValue, setFilterValue] = useState("");
  const [facultyData, setfacultyData] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [SBox, setSBox] = useState(false);
  const [DBox, setDBox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "fid",
    direction: "ascending",
  });
  const [empIDS, setfacultyIDS] = useState(null);
  const [empIDD, setfacultyIDD] = useState(null);
  //eslint-disable-next-line
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const hasSearchFilter = Boolean(filterValue);

  const navigate = useNavigate();

  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BackendURLS.Admin}/viewfaculties`);
        const facultyWithProfiles = response.data.map((faculty) => {
          const fprofile = `data:image/jpeg;base64,${faculty.fprofile}`;
          return { ...faculty, fprofile };
        });
        setfacultyData(facultyWithProfiles);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const handleStatus = ()=>{

  }

  const handleDelete = ()=>{

  }

  const exportToCSV = () => {
    const filename = `faculty_${Date.now()}`;
    const exportType = exportFromJSON.types.csv;
    const dataToExport = facultyData.map(({ fprofile, ...rest }) => rest);
    exportFromJSON({ data: dataToExport, fileName:filename, exportType });
  };

  const exportToCSV_A = () => {
    const filename = `active_faculty_${Date.now()}`;
    const exportType = exportFromJSON.types.csv;
    const activeUsers = facultyData
      .filter((user) => user.fstatus === "ACTIVE")
      .map(({ fprofile, ...rest }) => rest);
    //console.log(activeUsers)
    //console.log("Filename:", filename);
    exportFromJSON({ data: activeUsers, fileName:filename, exportType });
  };

  const exportToExcel = () => {
    const filename = `faculty_${Date.now()}.xlsx`;
    const wb = XLSX.utils.book_new();
    const dataToExport = facultyData.map(({ fprofile, ...rest }) => rest);
    const shdata = XLSX.utils.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(wb, shdata, "Sheet-1");
    XLSX.writeFile(wb, filename);
  };

  const exportToExcel_A = () => {
    const filename = `active_faculty_${Date.now()}.xlsx`;
    const wb = XLSX.utils.book_new();
    const activeUsers = facultyData
      .filter((user) => user.fstatus === "ACTIVE")
      .map(({ fprofile, ...rest }) => rest);
    const shdata = XLSX.utils.json_to_sheet(activeUsers);
    XLSX.utils.book_append_sheet(wb, shdata, "Sheet-1");
    XLSX.writeFile(wb, filename);
  };

  const headerColumns = useMemo(() => columns, []);

  const filteredItems = useMemo(() => {
    if (facultyData.length === 0) return []; // Guard against empty users array

    let filteredUsers = [...facultyData];

    if (hasSearchFilter) {
      // console.log(filteredUsers);
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.fname &&
          user.fname.toLowerCase().includes(filterValue.toLowerCase())
      );
      // console.log(filteredUsers);
    }
    // console.log(statusFilter)
    // console.log(Array.from(statusFilter).length);
    // console.log(statusOptions.length);

    if (
      statusFilter &&
      Array.from(statusFilter).length > 0 &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.fstatus &&
          Array.from(statusFilter).includes(user.fstatus.toLowerCase())
      );
      // console.log(filteredUsers);
      // console.log(filteredUsers);
    }
    // console.log(filteredUsers)
    return filteredUsers;
    // eslint-disable-next-line
  }, [facultyData, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);
  // console.log(items);
  const sortedItems = useMemo(() => {
    // console.log(items);
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const bottomContent = useMemo(() => {
    return (
      <div clasfname="py-2 px-2 flex justify-center ">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages,facultyData]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "fname":
        return (
          <User
            avatarProps={{
              size: "lg",
              src: user.fprofile,
            }}
            description={user.femail}
            name={user.fname}
          >
            {user.femail}
          </User>
        );
      case "fstatus":
        return (
          <Chip
            clasfname="capitalize"
            color={statusColorMap[user.fstatus.toLowerCase()]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div clasfname="relative flex items-center gap-2">
            <Dropdown aria-label="VerticalDots">
              <DropdownTrigger>
                <Button
                  aria-label="VerticalDots"
                  isIconOnly
                  size="sm"
                  variant="light"
                >
                  <VerticalDotsIcon clasfname="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {/* <DropdownItem
                  aria-label="View"
                  onClick={() =>
                    navigate(`/admin/viewfaculty/${user.filterid}`)
                  }
                >
                  View
                </DropdownItem> */}
                <DropdownItem
                  aria-label="Edit"
                  onClick={() =>
                    navigate(`/admin/updatefaculty/${user.fid}`)
                  }
                >
                  Edit
                </DropdownItem>
                
                {/* <DropdownItem
                  aria-label="Set Status"
                  onClick={() => {
                    setfacultyIDS(user.fid);
                    setSBox(true);
                  }}
                >
                  Set Status
                </DropdownItem> */}
                {/* <DropdownItem
                  color="danger"
                  variant="shadow"
                  aria-label="Delete"
                  onClick={() => {
                    setfacultyIDD(user.fid);
                    setDBox(true);
                  }}
                >
                  Delete
                </DropdownItem> */}
              </DropdownMenu>

            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, [navigate]);

  const onSearchChange = (value) => {
    setFilterValue(value);
    setPage(1);
  };

  const onClear = () => {
    setFilterValue("");
    setPage(1);
  };

  
  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div>
        <br/>
        <div className="flex flex-col gap-10 ml-2 mt-9">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <br />
            <div className="flex gap-3 mr-2">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={true}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button color="primary" variant="shadow" onClick={()=>navigate(`/admin/addstudent`)} endContent={<PlusIcon />}>
                Add New
              </Button>
              <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Download
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                <DropdownItem aria-label="Export As CSV(Active)" onClick={exportToCSV_A}  >Export As CSV(Active)</DropdownItem>
                <DropdownItem aria-label="Export as Excel(Active)" onClick={exportToExcel_A} >Export as Excel(Active)</DropdownItem>
                <DropdownItem aria-label="Export as CSV" onClick={exportToCSV} >Export as CSV</DropdownItem>
                <DropdownItem aria-label="Expost as Excel" onClick={exportToExcel} >Export as Excel</DropdownItem>
              </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div
            className="flex justify-between items-center"
            style={{ color: "black" }}
          >
            <span className=" text-black text-small">
              Total {facultyData.length} users
            </span>
            <label className="flex items-center text-black text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-black text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    );
    // eslint-disable-next-line
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    facultyData.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  if (isLoading) {
    return (
      <div style={spinnerContainerStyle}>
        <Spinner label="Loading..." color="warning" size="lg" />
      </div>
    );
  }

  

  return (
    <div>
      <div 
    // style={{backgroundColor:'white'}}
    clasfname="mx-4"
     >
      <Table
        
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        // className="mx-1"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns} >
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        {/* {console.log(sortedItems)} */}
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.fid}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal backdrop={"blur"} isOpen={SBox} onClose={()=>setSBox(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader clasfname="flex flex-col gap-1">Change Status</ModalHeader>
              <ModalBody>
                <p>Are You Sure you want to change the status of the Faculty (ID : {empIDS}) ?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={()=>handleStatus(empIDS)}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal backdrop={"blur"} isOpen={DBox} onClose={()=>setDBox(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader clasfname="flex flex-col gap-1">Change Status</ModalHeader>
              <ModalBody>
                <p>Are You Sure you want to Delete Faculty (ID : {empIDD}) ?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={()=>handleDelete(empIDD)}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
    </div>
  );
}
