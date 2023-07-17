import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillEdit, AiOutlineEye } from "react-icons/ai";
import isEnglish from "../../../helpers/isEnglish";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { IoIosPersonAdd } from "react-icons/io";
import { fetchCategories, deleteCategory } from "../../../store/category";
import DeleteModal from "../../../components/Commun/Modal";
import Select from "react-select";
import { BiDotsVerticalRounded } from "react-icons/bi";
import "../../../assets/styles/chatRoom.css";

function ChatList() {
  const [show, setShow] = useState(false);
  const [elementId, setElementId] = useState(null);
  const [rows, setRows] = useState(null);
  const dispatch = useDispatch();
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [basicModalDeleteid, setBasicModalDeleteid] = useState(false);
  const [open, setOpen] = useState(false);

  const categories = useSelector((state) => state.category.categories);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (categories?.items?.length) {
      let categoryData = categories.items.map((e, index) => {
        return {
          ...e,
          index: index,
        };
      });
      setRows(categoryData);
    }
  }, [categories.items]);

  const columns = [
    { field: "index", headerName: "Index", width: 90 },
    { field: "id", headerName: "ID", width: 90 },
    { field: "nameAr", headerName: "Admin", width: 150, editable: false },
    { field: "nameEn", headerName: "Members", width: 150, editable: false },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate =
          date.toISOString().split("T")[0] +
          " At " +
          date.toISOString().split("T")[1].split(".")[0];
        return formattedDate;
      },
    },
    {
      field: "updatedAt",
      headerName: "updatedAt",
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate =
          date.toISOString().split("T")[0] +
          " At " +
          date.toISOString().split("T")[1].split(".")[0];
        return formattedDate;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiFillEdit />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,

          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              toggleShowDelete(id);
            }}
            color="error"
          />,
        ];
      },
    },
  ];
  const isEng = isEnglish();
  const Navigate = useNavigate();

  const handleDeleteClick = (id) => {
    dispatch(deleteCategory(basicModalDeleteid)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("Cayegory has been deleted");
        dispatch(fetchCategories());
        setBasicModalDelete(false);
      }
    });
  };

  const toggleShowDelete = (id) => {
    setBasicModalDeleteid(id);

    setBasicModalDelete(!basicModalDelete);
  };

  const handleEditClick = (id) => {
    Navigate(`editCategory/${id}`);
  };

  return (
    <div>
      <DeleteModal
        toggleShow={toggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={!true}
        ofDelete={true}
        bodOfDelete={
          <div className="d-flex justify-content-center align-items-center">
            You want to Delete this chat ?
          </div>
        }
        fn={() => {
          handleDeleteClick();
        }}
      />
      <div>
        <div className="container">
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List Disscussion</h2>
          <hr></hr>
          <Button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              Navigate("create");
            }}
            variant="outlined"
          >
            <span className="btn btn-sm ">Add Chat</span>
          </Button>
          {true ? (
            <>
              <button
                style={{
                  textAlign: "start",
                  marginTop: "15px",
                  border: "none",
                  backgroundColor: "white",
                  cursor: "pointer",
                  color: "black",
                  marginBottom: "5px",
                  marginLeft: "0px"
                }}
                onClick={handleOpen}
              >
                <span>
                  Select chat type 
                </span>
                <BiDotsVerticalRounded style={{ fontSize: 25 }} />
              </button>
              {open ? (
                <div className="divList">
                  <ul class="list-group">
                    <li
                      class="list-group-item"
                      onClick={() => toggleShowEdit()}
                    >
                      Groups
                    </li>
                    <li class="list-group-item">2 Users chat</li>
                  </ul>
                </div>
              ) : null}
            </>
          ) : null}
          <Box>
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
          </Box>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
