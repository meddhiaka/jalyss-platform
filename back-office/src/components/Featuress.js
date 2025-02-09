import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFeatures,
  editFeature,
  fetchFeatures,
} from "../store/tarifSession";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Box } from "@mui/material";
import Modal from "../components/Commun/Modal";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import StyledInput from "./Commun/inputs/StyledInput";

function Featuress() {
  const dispatch = useDispatch();
  const featuresStore = useSelector((state) => state.tarifSession);
  const { features } = featuresStore;
  const [rows, setRows] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [idOfDelete, setIdOfDelete] = useState("");
  const [label, setLabel] = useState(null);
  const [editRowId, setEditRowId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [labelOfDelete, setLabelOfDelete] = useState("");
  console.log("storfeat", featuresStore);

  useEffect(() => {
    if (editModal && editRowId) {
      const row = rows.find((row) => row.id === editRowId);
      if (row) {
     
        setLabel({labelEn:row.labelEn,labelAr:row.labelAr});
      }
    }
   
  }, [editModal, editRowId, rows]);

  useEffect(() => {
    dispatch(fetchFeatures());
  }, [dispatch]);
console.log("lllllllll",label);
  useEffect(() => {
    if (features?.items?.length) {
      let aux = features?.items.map((e) => {
        return {
          ...e,
          label: e.labelEn,
          createdAt: e.createdAt.slice(0, 10),
        };
      });
      setRows(aux);
    }
  }, [features?.items]);

  const toggleShow = () => {
    setBasicModal(!basicModal);
  };
  const toggleShow2 = () => {
    setEditModal(!editModal);
  };
  useEffect(() => {
    if (basicModal && idOfDelete) {
      const row = rows.find((row) => row.id === idOfDelete);
      if (row) {
        setLabelOfDelete(row.label);
      }
    }
  }, [basicModal, idOfDelete, rows]);

  const handleDeleteFeatureClick = (id) => {
    dispatch(deleteFeatures(id))
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Feature has been deleted");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });
  };

  const handleEdit = () => {
   
    dispatch(editFeature({ id: editRowId, labelEn:label.labelEn , labelAr:label.labelAr }))
      .then((res) => {
        if (res.error) {
          showErrorToast(res.error.message);
        } else {
          showSuccessToast("Features has been Updated");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });

    setEditRowId("");
    setLabel({});
    toggleShow2();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabel((label) => ({ ...label, [name]: value }));
  };

  const columns = [
    {
      field: "labelEn",
      headerName: "LabelEn",
      width: 330,
      editable: false,
    },
    {
      field: "labelAr",
      headerName: "LabelAr",
      width: 330,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      width: 330,
      sortable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 330,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiFillEdit style={{ color: "blue" }} />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={() => {
              toggleShow2();
              setEditRowId(id);
            }}
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            color="error"
            onClick={() => {
              toggleShow();
              setIdOfDelete(id);
            }}
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <div className="position-relative">
        <div className="mb-3">Feature's List</div>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
      <Modal
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        toggleShow={toggleShow}
        ofDelete={true}
        bodOfDelete={
          <div className="d-flex justify-content-center align-items-center">
            {`Are you sure you want to delete `}
            <span style={{ color: "red", margin: "10px" }}>
              {labelOfDelete}
            </span>
            {` Feature?`}
          </div>
        }
        confirm={() => {
          handleDeleteFeatureClick(idOfDelete);
          setBasicModal(false);
        }}
      />

      <Modal
        basicModal={editModal}
        setBasicModal={setEditModal}
        toggleShow={toggleShow2}
        normal={true}
        title="Edit feature"
        body={
          <div
            className="d-flex flex-column gap-3 justify-content-center align-items-center "
            style={{ marginRight: "50px" }}
          >
            <StyledInput
              value={label?.labelEn}
              label="LabelEn"
              name="labelEn"
              onChange={handleChange}
            />
            <StyledInput
              value={label?.labelAr}
              label="LabelAr"
              name="labelAr"
              onChange={handleChange}
            />
          </div>
        }
        fn={handleEdit}
      />
    </div>
  );
}

export default Featuress;
