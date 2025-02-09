import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRole, updateRole } from "../../../store/role";
import { Box, Card, Typography } from "@mui/material";
import EditModal from "../../../components/Commun/Modal";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function EditRole() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();
  const roledata = useSelector((state) => state.role.role);
  const [data, setData] = useState([]);
  const [dataToSave, setdataToSave] = useState();
  const [EditMode, setEditMode] = useState(false);
  const actions = ["create", "update", "delete", "view"];
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [rows, setRows] = useState(null);

  useEffect(() => {
    dispatch(fetchRole(id));
  }, [id]);

  useEffect(() => {
    setdataToSave({ ...roledata });
  }, [id]);

  const [role, setRole] = useState({
    permissions: {
      employee: ["create", "update", "delete", "view"],
      blog: ["create", "update", "delete", "view"],
      Article: ["create", "update", "delete", "view"],
      ArticleByBrunch: ["create", "update", "delete", "view"],
      providers: ["create", "update", "delete", "view"],
      category: ["create", "update", "delete", "view"],
      type: ["create", "update", "delete", "view"],
      publishingHouse: ["create", "update", "delete", "view"],
      author: ["create", "update", "delete", "view"],
      orderList: ["create", "update", "delete", "view"],
      listOfUsers: ["create", "update", "delete", "view"],
      client: ["create", "update", "delete", "view"],
      space: ["create", "update", "delete", "view"],
      training: ["create", "update", "delete", "view"],
      chat: ["create", "update", "delete", "view"],
      role: ["create", "update", "delete", "view"],
    },
  });

  const [Newrole, setNewRole] = useState({
    newpermissions: {
      employee: [false, false, false, false],
      blog: [false, false, false, false],
      Article: [false, false, false, false],
      ArticleByBrunch: [false, false, false, false],
      providers: [false, false, false, false],
      category: [false, false, false, false],
      type: [false, false, false, false],
      publishingHouse: [false, false, false, false],
      author: [false, false, false, false],
      orderList: [false, false, false, false],
      listOfUsers: [false, false, false, false],
      client: [false, false, false, false],
      space: [false, false, false, false],
      training: [false, false, false, false],
      chat: [false, false, false, false],
      role: [false, false, false, false],
    },
  });

  useEffect(() => {
    if (EditMode && roledata?.permissions) {
      const updatedNewRole = { ...Newrole };
      let index;
      roledata.permissions.forEach((e, i) => {
        if (e.action === "create") {
          index = 0;
        } else if (e.action === "update") {
          index = 1;
        } else if (e.action === "delete") {
          index = 2;
        } else if (e.action === "view" || e.action === "read") {
          index = 3;
        }
        updatedNewRole.newpermissions[e.domain][index] = true;
        const newPermissionObject = {
          action: actions[index],
          domain: e.domain,
        };
        setData((prevData) => [...prevData, newPermissionObject]);
        setRows((prevData) => [...prevData, newPermissionObject]);

      });
      setNewRole(updatedNewRole);
    }
  }, [EditMode, roledata]);

  const handlePermissionChange = (roleName, permission) => {
    const updatedNewRole = { ...Newrole };
    const newPermissionObject = {
      action: actions[permission],
      domain: roleName,
    };
    updatedNewRole.newpermissions[roleName][permission] =
      !updatedNewRole.newpermissions[roleName][permission];
    const existingIndex = data.findIndex(
      (item) =>
        item.domain === newPermissionObject.domain &&
        item.action === newPermissionObject.action
    );
    if (existingIndex !== -1) {
      const newData = data.slice();
      newData.splice(existingIndex, 1);
      setData(newData);
    } else {
      setData((prevData) => [...prevData, newPermissionObject]);
    }
    setNewRole(updatedNewRole);
  };

  const handleSubmit = () => {
    const body = {
      id: roledata.id,
      nameAr: dataToSave?.nameAr,
      nameEn: dataToSave?.nameEn,
      permissions: data,
    };
    let aux = Object.assign({}, body);
    data.length
      ? dispatch(updateRole(aux)).then((res) => {
        if (!res.error) {
          showSuccessToast("Role updated");
          setData([]);
          toggleShowDelete();
          setEditMode(!EditMode);
        } else {
          showErrorToast(res.error.message);
        }
      })
      : showErrorToast("There is no data");
  };
  const onCanceltoggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
    setEditMode(false);
  };
  const toggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
  };
  const permissionsByDomain = {};
  const columns = [
    { field: "permissions", headerName: "permissions", width: 150, editable: false },
  ]
  return (
    <div className="container">
      <div className="card">
        <div className="container">
          {!EditMode ? (
            <>
              <div className="d-flex justify-content-center">
                <div
                  class="row"
                  style={{ marginBottom: "10px", marginTop: "30px" }}
                >
                  <h2 style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>Edit role</h2>
                  <div style={{
                    marginLeft: "170px",
                    marginRight: "122px",
                    width: "70%",
                    borderRadius: "24px",
                    border: " 1px solid rgba(192, 194, 204)",
                    marginBottom: "1rem"
                  }}>
                    <div className=" d-flex justify-content-evenly " style={{ marginTop: "10px" ,marginBottom:"20px"}}>
                      <Typography
                        style={{
                          fontFamily: "Arial",
                          fontSize: "18px",

                          color: "#333",
                          display: "table-row",
                        }}
                      >

                        <span
                          style={{
                            fontWeight: "bold",
                            display: "table-cell",
                            fontSize: "large",
                            paddingRight: "40px",
                          }}
                        >
                          Name (Ar) :
                        </span>
                        <span style={{ display: "table-cell" }}>
                          {roledata?.nameAr}
                        </span>
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Arial",
                          fontSize: "16px",
                          color: "#333",
                          display: "table-row",
                        }}>
                        <span
                          style={{
                            display: "table-cell",
                            fontSize: "large",
                            paddingRight: "40px",
                            fontWeight: "bold",
                          }}
                        >
                          Name (En):
                        </span>
                        <span style={{ display: "table-cell" }}>
                          {roledata?.nameEn}
                        </span>

                      </Typography>
                      <br></br>

                    </div>
                    <table class="table">
                      <thead>
                        <tr>
                        <th scope="col"></th>
                          <th scope="col">domain</th>
                          <th scope="col">action</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                      {roledata?.permissions?.forEach((permission) => {
                        if (!permissionsByDomain[permission.domain]) {
                          permissionsByDomain[permission.domain] = [];
                        }
                        permissionsByDomain[permission.domain].push(
                          permission.action
                        );
                       })}
                      {Object.keys(permissionsByDomain).map((domain) => (
                        <tr>
                          <th></th>
                          <td> {domain}</td>
                          <td>{permissionsByDomain[domain].join(" - ")}</td>
                        
                        </tr>
                       ))}
                      </tbody>
                    </table>
                    {/* <Box sx={{ height: 400, width: "100%" }}>
                      {rows?.length > 0 ? (
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          pageSizeOptions={[5]}
                          disableRowSelectionOnClick
                        />
                      ) : null}
                    </Box> */}
                    {/* <Typography
                        style={{
                          fontFamily: "Arial",
                          fontSize: "18px",

                          color: "#333",
                          display: "table-row",
                        }}
                       >
                        <span
                          style={{
                            fontWeight: "bold",
                            display: "table-cell",
                            fontSize: "large",
                            paddingRight: "40px",
                          }}
                        >
                          Permission :
                        </span>
                        
                          
                        {roledata?.permissions?.forEach((permission) => {
                        if (!permissionsByDomain[permission.domain]) {
                          permissionsByDomain[permission.domain] = [];
                        }
                        permissionsByDomain[permission.domain].push(
                          permission.action
                        );
                       })}
                      
                        
                        {Object.keys(permissionsByDomain).map((domain) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell 
                              component="th"
                             style={{ display: "table-cell",fontSize: "18px" }}
                              scope="row"
                            >
                              {domain}
                            </TableCell>
                            <TableCell align="left" >
                              {permissionsByDomain[domain].join(" - ")}
                            </TableCell>
                          </TableRow>
                        ))}
                     
                      </Typography>  */}

                    <div className="w-100 d-flex justify-content-center">
                      <button
                        type="submit"
                        onClick={() => {
                          setEditMode(!EditMode);
                        }}
                        className="confirm-button mt-5   mb-3"
                      >
                        <span className="label-btn"> Edit role </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="card" style={{ borderRadius: 20, border: 5 }}>
              <div className="container">
                <div className="row mb-5">
                  <div className="form-group col-6 mt-3">
                    <label>NameAr</label>
                    <input
                      type="text"
                      className="form-control"
                      value={dataToSave.nameAr || ""}
                      onChange={(e) => {
                        setdataToSave({ ...dataToSave, nameAr: e.target.value });
                      }}
                      placeholder="NameAr"
                    />
                  </div>
                  <div className="form-group col-6 mt-3">
                    <label>NameEn</label>
                    <input
                      type="text"
                      className="form-control"
                      value={dataToSave.nameEn || ""}
                      onChange={(e) => {
                        setdataToSave({ ...dataToSave, nameEn: e.target.value });
                      }}
                      placeholder="NameEn"
                    />
                  </div>
                </div>
                <div className="row mt-5">
                  {Object.entries(Newrole.newpermissions).map(
                    ([roleName, permissions]) => (
                      <div className="col-md-4" key={roleName}>
                        <div className="card mb-4">
                          <div className="card-body">
                            <h5 className="card-title">{roleName}</h5>
                            {permissions?.map((permission, index) => (
                              <div className="d-flex">
                                <div
                                  className="form-check"
                                  key={`${roleName}-${permission}`}
                                >
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`${roleName}-${permission}`}
                                    checked={permission}
                                    onChange={() =>
                                      handlePermissionChange(roleName, index)
                                    }
                                  />
                                </div>
                                <label className="form-check-label h6">
                                  {permission} -{" "}
                                  {role.permissions[roleName][index]
                                    ? role.permissions[roleName][index]
                                    : "False"}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="w-100 d-flex justify-content-center">
                  <button
                    type="submit"
                    onClick={toggleShowDelete}
                    className="confirm-button mt-5   mb-3"
                  >
                    <span className="label-btn"> Save changes </span>
                  </button>
                </div>
              </div>
            </div>
          )}
          <EditModal
            toggleShow={onCanceltoggleShowDelete}
            basicModal={basicModalDelete}
            setBasicModal={setBasicModalDelete}
            normal={true}
            ofDelete={!true}
            title={
              <div
                style={{ width: "200%", marginLeft: "100%" }}
                className="d-flex justify-content-center align-items-center"
              >
                Are you sure !
              </div>
            }
            body={
              <div className="d-flex justify-content-center align-items-center">
                You want to edit this role ?
              </div>
            }
            fn={() => {
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EditRole;
