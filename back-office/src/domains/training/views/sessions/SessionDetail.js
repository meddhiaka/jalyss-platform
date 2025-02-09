import React, { useEffect, useState } from "react";
import { Card, Button, Table } from "react-bootstrap";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateNeswSession,
  fetchsessions,
  fetchOnesession,
  editsession,
} from "../../../../store/sessions";
import { Title } from "@mui/icons-material";
import AutoCompleteFilter from "../../../../components/Commun/AutoCompleteFilter";
import { fetchCategories } from "../../../../store/category";
import AddButton from "../../../../components/buttons/AddButton";
import { useNavigate, useParams } from "react-router-dom";
import SaveButton from "../../../../components/Commun/buttons/SaveButton";
import { useRef } from "react";
import Modal from "../../../../components/Commun/Modal";
import Select from "react-select";
import { MDBModalFooter } from "mdb-react-ui-kit";
import axios from "axios";
import { fetchFeatures } from "../../../../store/tarifSession";
import TrainingStepper from "../../../../components/TrainingStepper";
import TarifSection from "../../../../components/TarifSection";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import StyledInput from "../../../../components/Commun/inputs/StyledInput";
import {
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import CloseButton from "../../../../components/Commun/buttons/CloseButton";
import TrainingPricing from "../../components/TrainingPricing";
import { fetchGains, fetchPrerequires } from "../../../../store/gain";
import { fetchsessionstypes } from "../../../../store/sessiontypes";

import { DatePicker, Form } from "antd";
import DisplayLottie from "./../../../../components/DisplayLottie";
import pricing1 from "../../../../constants/pricing1.json";
import moment from "moment";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import UpdateButton from "../../../../components/Commun/buttons/UpdateButton";
import uploadImage from "../../../../assets/images/uploadImage.png";
import AddLecture from "../../components/AddLecture";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Subscribers from "../../components/Subscribers";

dayjs.extend(weekday);
dayjs.extend(localeData);

const SessionDetails = () => {
  const navigate = useNavigate();
  const { sessionsId } = useParams();
  const dispatch = useDispatch();
  const sessionStore = useSelector((state) => state.sessions);
  const { sessions, session } = sessionStore;
  const categoriesStore = useSelector((state) => state.category);
  const featuresStore = useSelector((state) => state.tarifSession.features);
  const gainsStore = useSelector((state) => state.gain);
  const { gains } = gainsStore;
  const prereqStore = useSelector((state) => state.gain);
  const { prerequires } = prereqStore;
  const typesStore = useSelector((state) => state.sessiontypes);
  const { types } = typesStore;
  const { categories } = categoriesStore;

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedGains, setSelectedGains] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrerequire, setSelectedPrerequire] = useState([]);
  const [cover, setCover] = useState(null);
  const [addSession, setAddSession] = useState({ tarifs: [], lectures: [] });
  const [tarif, setTarif] = useState(null);
  const [lecture, setLecture] = useState(null);
  const [index, setIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editFeatures, setEditFeatures] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [previousSessionId, setPreviousSessionId] = useState(null);
  const [elementToDelete, setElementToDelete] = useState(null);
  const [sessionMedias, setSessionMedias] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [showAddTarifModal, setShowAddTarifModal] = useState(false);
  const [showAddLectureModal, setShowAddLectureModal] = useState(false);

  const fileInputRef = useRef(null); // Reference to the file input element

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [readOnly, setReadOnly] = useState(true);

  const take = sessions?.items?.count || 10;
  const skip = 0;
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 250,
      editable: false,
      valueGetter: (params) => {
        return params.row?.titleEn
          ? params.row.titleEn
          : params.row.lectures.titleEn;
      },
    },
    {
      field: "startAt",
      headerName: "StartAt",
      width: 120,
      sortable: false,
      valueGetter: (params) => {
        return params.row?.startAt;
      },
    },
    {
      field: "endAt",
      headerName: "EndAt",
      width: 120,
      sortable: false,
      valueGetter: (params) => {
        return params.row?.endAt;
      },
    },
    !readOnly && {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 330,
      cellClassName: "actions",
      getActions: (row) => {
        return [
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            color="error"
            onClick={() => {
              setDeleteModal(!deleteModal);
              setElementToDelete(row);
            }}
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchOnesession(sessionsId));
    dispatch(fetchCategories());
    dispatch(fetchFeatures());
    dispatch(fetchGains());
    dispatch(fetchPrerequires());
    dispatch(fetchsessionstypes());
    dispatch(fetchsessions({ take, skip }));
  }, [dispatch]);

  useEffect(() => {
    setAddSession({ ...addSession, ...session });
    setPreviousSessionId(session?.previousSessionId);
    setCategoryId(session?.categoryId);
    setSelectedFeatures(
      session?.SessionHasFeatures?.map((elem) => elem.feature)
    );
    setSelectedGains(
      session?.SessionHasWhatYouWillLearn?.map((elem) => elem.WhatYouWillLearn)
    );
    setSelectedPrerequire(
      session?.sessionHasPrerequire?.map((elem) => elem.prerequire)
    );
    setSelectedTypes(session?.sessionType?.map((elem) => elem.sessiontype));
    setStartDate(session?.startDate);
    setEndDate(session?.endDate);
  }, [session, readOnly]);

  useEffect(() => {
    setAddSession({ ...addSession, tarifs: [] });
  }, [editFeatures]);
  const onDeleteTarif = (index) => {
    const updatedTarifs = [...session.tarifs];
    updatedTarifs.splice(index, 1);
    setAddSession({ ...session, tarifs: updatedTarifs });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
  };

  const handleChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "") {
      alert("Please choose a category!");
    } else {
      setCategoryId(selectedOption);
    }
  };
  const handleImageClick = () => {
    document.getElementById("coverUpload").click(); // Programmatically trigger the file input click event
  };

  function onChange(val) {
    const [start, end] = val;
    setStartDate(start);
    setEndDate(end);
  }

  const handleAddSessionChange = (e) => {
    const { name, value } = e.target;

    setAddSession((AddSession) => ({
      ...AddSession,
      [name]: value,
    }));
  };

  const submitTarif = (e) => {
    e.preventDefault();

    let auxTarifs = [...addSession.tarifs];
    if (isEdit) {
      auxTarifs[index] = tarif;
      setIsEdit(false);
    } else {
      auxTarifs = [...auxTarifs, tarif];
    }
    auxTarifs = auxTarifs.sort((a, b) => {
      return a.price - b.price;
    });
    setAddSession((AddSession) => ({
      ...AddSession,
      tarifs: auxTarifs,
    }));

    setTarif(null);
    setIndex(null);
    setShowAddTarifModal(false);
  };

  const submitLecture = (e) => {
    e.preventDefault();

    let auxLectures = [...addSession.lectures, lecture];
    // if (isEdit) {
    //   auxLectures[index] = tarif;
    //   setIsEdit(false);
    // } else {
    // auxTarifs = [...auxTarifs, tarif];
    // }
    // auxTarifs = auxTarifs.sort((a, b) => {
    //   return a.price - b.price;
    // });
    setAddSession((AddSession) => ({
      ...AddSession,
      lectures: auxLectures,
    }));

    setLecture(null);
    // setIndex(null);
    setShowAddLectureModal(false);
  };

  const submitsession = async (event) => {
    event.preventDefault();

    if (selectedFeatures.length === 0) {
      showErrorToast("Pick freatures");

      return;
    }
    if (addSession.tarifs.length === 0) {
      showErrorToast("create one tarif as minimun");
      return;
    }
    if (addSession.lectures.length === 0) {
      showErrorToast("create one lecture as minimun");
      return;
    }
    let aux = {
      id: addSession.id,
      titleEn: addSession.titleEn,
      titleAr: addSession.titleAr,
      descriptionEn: addSession.descriptionEn,
      descriptionAr: addSession.descriptionAr,

      tarifs: addSession.tarifs,
      lectures: addSession.lectures,
    };
    aux.categoryId = categoryId;
    aux.startDate = startDate;
    aux.endDate = endDate;
    if (cover !== null) {
      const image = new FormData();
      image.append("file", cover);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_UPLOAD_ENDPOINT}/upload`,
        image
      );
      aux.coverId = response.data.id;
    }
    aux.SessionHasFeaturesIds = selectedFeatures.map((e) => e.id);
    aux.sessionHasPrerequiresIds = selectedPrerequire.map((e) => e.id);
    aux.sessionHasGainsIds = selectedGains.map((e) => e.id);
    aux.sessionTypesIds = selectedTypes.map((e) => e.id);
    aux.previousSessionId = previousSessionId;
    aux.tarifs = aux.tarifs.map((elem) => ({
      titleEn: elem.titleEn,
      titleAr: elem.titleAr,

      price: elem.price,
      features: elem.features.map((el) => ({
        id: el?.id ? el.id : el?.feature?.id,
        isAvailable: el.isAvailable,
      })),
    }));

    dispatch(editsession(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast("session.updated");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
    console.log("aux", aux);
  };
  const handleAddSessionMedia = async () => {
    if (sessionMedias !== null) {
      const image = new FormData();
      for (let i = 0; i < sessionMedias.length; i++) {
        image.append("files", sessionMedias[i]);
      }
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_UPLOAD_ENDPOINT}/uploads`,
        image
      );
      let aux = response.data.map((elem) => elem.id);
      const responseMedia = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/session/media/${sessionsId}`,
        aux
      );
      dispatch(fetchOnesession(sessionsId)).then((res) => {
        setSessionMedias(null);
      });
    }
  };
  const handleDeleteLecture = () => {
    const updatedLectures = addSession.lectures.filter(
      (lecture) => lecture.lectureId !== elementToDelete.id
    );

    setAddSession((AddSession) => ({
      ...AddSession,
      lectures: updatedLectures,
    }));

    setDeleteModal(false);
  };
  const generateRowId = (row) => {
    return row.lectureId;
  };

  return (
    <div>
      <input
        type="file"
        className="form-control visually-hidden"
        id="coverUpload"
        onChange={handleImageChange}
        ref={fileInputRef}
      />
      {readOnly && (
        <div className="d-flex justify-content-end p-3">
          <UpdateButton onClick={() => setReadOnly(false)} />
        </div>
      )}
      <form onSubmit={submitsession} className="mx-5">
        <h3 className="muted d-flex justify-content-center align-items-center my-3">
          {" "}
          Update Session{" "}
        </h3>

        <div className="d-flex justify-content-center align-items-center my-3">
          {cover || session?.cover?.path ? (
            <div
              style={{
                width: "600px",
                height: "300px",
                marginTop: "10px",
                position: "relative",
                border: "1px solid black",
              }}
            >
              <img
                src={
                  cover
                    ? URL.createObjectURL(cover)
                    : session?.cover
                    ? session?.cover?.path
                    : null
                }
                style={{
                  width: "600px",
                  height: 300,
                  objectFit: "contain",
                }}
                alt="Cover Image"
                className="rounded "
              />
              {!readOnly && (
                <div
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                  }}
                >
                  <UpdateButton
                    type="button"
                    onClick={handleImageClick}
                    content="Upload New Cover"
                  ></UpdateButton>
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                width: "600px",
                height: "300px",
                marginTop: "10px",
                position: "relative",
                border: "1px solid black",
                cursor: "pointer",
              }}
              onClick={handleImageClick}
            >
              <img
                alt="add cover"
                style={{
                  width: "600px",
                  height: 300,
                  objectFit: "contain",
                }}
                src={uploadImage}
                className="rounded "
              />
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center w-100 m-3">
          <TableContainer className="" component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell className="fw-bold">Cover:</TableCell>
                  <TableCell>
                    {!cover && (
                      <input
                        type="file"
                        className="form-control "
                        onChange={handleImageChange}
                        style={{ border: "1px solid #bfbab7", width: 290 }}
                      />
                    )}
                  </TableCell> */}
                  <TableCell className="fw-bold">TitleEn:</TableCell>
                  <TableCell>
                    {readOnly ? (
                      <span>{session?.titleEn}</span>
                    ) : (
                      <input
                        required
                        type="text"
                        placeholder="Enter the title en english"
                        name="titleEn"
                        value={addSession?.titleEn}
                        onChange={handleAddSessionChange}
                        style={{ border: "1px solid #bfbab7", width: 290 }}
                      />
                    )}
                  </TableCell>
                  <TableCell className="fw-bold">TitleAr:</TableCell>
                  <TableCell>
                    {readOnly ? (
                      <span>{session?.titleAr}</span>
                    ) : (
                      <input
                        required
                        type="text"
                        placeholder="Enter title en arabe"
                        name="titleAr"
                        value={addSession?.titleAr}
                        onChange={handleAddSessionChange}
                        style={{ border: "1px solid #bfbab7", width: 290 }}
                      />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold">DescriptionEn:</TableCell>
                  <TableCell>
                    {readOnly ? (
                      <span>{session?.descriptionEn}</span>
                    ) : (
                      <input
                        required
                        type="text"
                        value={addSession?.descriptionEn}
                        placeholder="Enter description"
                        name="descriptionEn"
                        onChange={handleAddSessionChange}
                        style={{ border: "1px solid #bfbab7", width: 290 }}
                      />
                    )}
                  </TableCell>
                  <TableCell className="fw-bold">DescriptionAr:</TableCell>
                  <TableCell>
                    {readOnly ? (
                      <span>{session?.descriptionAr}</span>
                    ) : (
                      <input
                        required
                        type="text"
                        value={addSession?.descriptionAr}
                        placeholder="Enter description en arabe"
                        name="descriptionAr"
                        onChange={handleAddSessionChange}
                        style={{ border: "1px solid #bfbab7", width: 290 }}
                      />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold">Category:</TableCell>
                  <TableCell>
                    {readOnly ? (
                      <span>{session?.category.nameEn}</span>
                    ) : (
                      <select
                        value={categoryId}
                        class="form-select "
                        aria-label="Default select example"
                        onChange={handleChange}
                        required
                        style={{
                          border: "1px solid #bfbab7",
                          width: 290,
                          height: 42,
                        }}
                      >
                        <option value="" disabled selected>
                          Choose your Session category
                        </option>
                        {categories.items.map((category, index) => (
                          <option key={index} value={category.id}>
                            {category.nameEn}
                          </option>
                        ))}
                      </select>
                    )}
                  </TableCell>
                  <TableCell className="fw-bold">Start-End-Date:</TableCell>

                  <TableCell>
                    {readOnly ? (
                      <span>
                        {startDate?.slice(0, 10)} ► {endDate?.slice(0, 10)}
                      </span>
                    ) : (
                      <Form.Item
                        name="range_picker"
                        rules={[
                          { required: true, message: "Please select date" },
                        ]}
                      >
                        <RangePicker
                          format="DD/MM/YYYY"
                          defaultValue={[dayjs(startDate), dayjs(endDate)]}
                          value={
                            startDate && endDate
                              ? [dayjs(startDate), dayjs(endDate)]
                              : null
                          }
                          onChange={onChange}
                          style={{ height: "40px" }}
                          className=""
                        />
                      </Form.Item>
                    )}
                  </TableCell>
                  {/* <TableCell className="fw-bold">Previous Session:</TableCell>
                  <TableCell>
                    {readOnly ? (
                      <span>{session?.previousSesion.titleEn}</span>
                    ) : (
                      <select
                        value={previousSessionId}
                        class="form-select "
                        aria-label="Default select example"
                        onChange={(e) => {
                          setPreviousSessionId(e.target.value);
                        }}
                        style={{
                          border: "1px solid #bfbab7",
                          width: 290,
                          height: 42,
                        }}
                      >
                        <option value="" disabled selected>
                          Choose your previous Session
                        </option>
                        {sessions?.items.map((session, index) => (
                          <option key={index} value={session.id}>
                            {session.titleEn}
                          </option>
                        ))}
                      </select>
                    )}
                  </TableCell> */}
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold">Gains:</TableCell>
                  <TableCell>
                    {readOnly ? (
                      <>
                        {selectedGains?.map((elem, i) => (
                          <p key={i}>{elem.contentEn}</p>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="d-flex">
                          <AutoCompleteFilter
                            required
                            value={selectedGains}
                            data={gains?.items}
                            labelOptionName="contentEn"
                            label="Add gains"
                            onChange={setSelectedGains}
                            placeholder="Add Your session's gain"
                            width={280}
                          />
                          <span style={{ color: "red" }}>*</span>
                        </div>
                        <div>
                          {!selectedGains?.length && (
                            <p style={{ color: "red", textAlign: "start" }}>
                              You must select gains for the session !{" "}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </TableCell>
                  <TableCell className="fw-bold">Prerequires:</TableCell>
                  <TableCell>
                    {readOnly ? (
                      selectedPrerequire?.map((elem, i) => (
                        <p key={i}>{elem.contentEn}</p>
                      ))
                    ) : (
                      <>
                        <div className="d-flex">
                          <AutoCompleteFilter
                            required
                            value={selectedPrerequire}
                            data={prerequires?.items}
                            labelOptionName="contentEn"
                            label="Add prerequires"
                            onChange={setSelectedPrerequire}
                            placeholder="Add Your session's prerequire"
                            width={280}
                          />
                          <span style={{ color: "red" }}>*</span>
                        </div>
                        <div>
                          {!selectedPrerequire?.length && (
                            <p style={{ color: "red", textAlign: "start" }}>
                              You must select prerequire for the session !{" "}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="fw-bold">Features:</TableCell>
                  <TableCell>
                    {readOnly ? (
                      selectedFeatures?.map((elem, i) => (
                        <p key={i}>{elem.labelEn}</p>
                      ))
                    ) : (
                      <>
                        <div className="d-flex">
                          <AutoCompleteFilter
                            required
                            data={featuresStore?.items}
                            value={selectedFeatures}
                            labelOptionName="labelEn"
                            label="Add features"
                            onChange={(value) => {
                              setSelectedFeatures(value);
                              setEditFeatures(true);
                            }}
                            placeholder="Add features"
                            width={280}
                          />
                          <span style={{ color: "red" }}>*</span>
                        </div>
                        <div>
                          {!selectedFeatures?.length && (
                            <p style={{ color: "red", textAlign: "start" }}>
                              You must select features for the session !{" "}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </TableCell>
                  <TableCell className="fw-bold">Types:</TableCell>
                  <TableCell>
                    {readOnly ? (
                      selectedTypes?.map((elem, i) => (
                        <p key={i}>{elem.titleEn}</p>
                      ))
                    ) : (
                      <>
                        <div className="d-flex">
                          <AutoCompleteFilter
                            required
                            value={selectedTypes}
                            data={types?.items}
                            labelOptionName="titleEn"
                            label="Add types"
                            onChange={setSelectedTypes}
                            placeholder="Select your session types !"
                            width={280}
                          />
                          <span style={{ color: "red" }}>*</span>
                        </div>
                        <div>
                          {!selectedTypes?.length && (
                            <p style={{ color: "red", textAlign: "start" }}>
                              You must select types for the session !{" "}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="fw-bold">Previous Session:</TableCell>
                  <TableCell>
                    {readOnly ? (
                      <span>{session?.previousSesion?.titleEn}</span>
                    ) : (
                      <select
                        value={previousSessionId}
                        class="form-select "
                        aria-label="Default select example"
                        onChange={(e) => {
                          setPreviousSessionId(e.target.value);
                        }}
                        style={{
                          border: "1px solid #bfbab7",
                          width: 290,
                          height: 42,
                        }}
                      >
                        <option value="" disabled selected>
                          Choose your previous Session
                        </option>
                        {sessions?.items.map((session, index) => (
                          <option key={index} value={session.id}>
                            {session.titleEn}
                          </option>
                        ))}
                      </select>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="p-5 d-flex flex-column gap-3">
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column justify-content-center align-items-center ">
              {!readOnly && (
                <AddButton
                  onClick={() => {
                    setShowAddLectureModal(true);
                  }}
                  content="Add Lecture"
                />
              )}
              <h3>Session Program</h3>
              <Box sx={{ height: 300 }}>
                <DataGrid
                  rows={addSession?.lectures}
                  columns={columns}
                  getRowId={generateRowId}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                />
              </Box>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center  ">
            {!readOnly && (
              <AddButton
                disabled={selectedFeatures?.length ? false : true}
                onClick={() => {
                  setShowAddTarifModal(true);
                  setTarif({
                    ...tarif,
                    features: selectedFeatures.map((elem) => ({
                      ...elem,
                      isAvailable: false,
                    })),
                  });
                }}
                content="Add Tarif"
              />
            )}
            <h3>Session Tarifs</h3>
            <DisplayLottie
              animationData={pricing1}
              style={{ width: "120px", height: "80px" }}
            />

            <div className="mt-4">
              <TrainingPricing
                readOnly={readOnly}
                session={addSession}
                onDeleteTarif={onDeleteTarif}
                setSession={setAddSession}
                fn={(t, i) => {
                  setTarif(t);
                  setIndex(i);
                  setIsEdit(true);
                  setShowAddTarifModal(true);
                }}
                header={true}
              />
            </div>
          </div>

          {!readOnly && (
            <div className="text-center">
              <SaveButton
                variant="primary"
                mt={20}
                onSubmit={submitsession}
                type="submit"
              />
              <CloseButton
                variant="primary"
                mt={20}
                onClick={() => {
                  setReadOnly(true);
                }}
                type="button"
              />
            </div>
          )}
        </div>
      </form>
      <div className="p-5  ">
        <div className="d-flex justify-content-end m-2">
          <input
            type="file"
            accept="image/*"
            className="form-control visually-hidden"
            id="sessionMediasUpload"
            onChange={(e) => {
              console.log(e.target.files);
              let array = Object.values(e.target.files);
              setSessionMedias(array);
            }}
            multiple
          />
          <AddButton
            onClick={() => {
              document.getElementById("sessionMediasUpload").click();
            }}
            content="Add Media"
          />
        </div>

        {sessionMedias && (
          <div
            className="d-flex flex-wrap  gap-3 p-3"
            style={{ backgroundColor: "rgb(0, 0, 0,0.5)" }}
          >
            {sessionMedias?.map((elem, i) => (
              <img
                alt="preview"
                src={URL.createObjectURL(elem)}
                key={i}
                style={{ height: 70, objectFit: "contain" }}
              />
            ))}
            <div className="d-flex align-items-end">
              {sessionMedias?.length ? (
                <SaveButton onClick={handleAddSessionMedia} type="button" />
              ) : null}
            </div>
          </div>
        )}
        <div className="d-flex flex-wrap gap-3">
          {session?.MediaSession?.map((elem, i) => (
            <img
              alt=""
              src={elem?.media?.path}
              key={i}
              style={{ height: 200, objectFit: "contain" }}
            />
          ))}
        </div>
      </div>
      <Subscribers />
      <Modal
        toggleShow={() => setShowAddTarifModal(false)}
        basicModal={showAddTarifModal}
        setBasicModal={setShowAddTarifModal}
        normal={true}
        title="Add new Tarif"
        noButtons={true}
        noFooter={true}
        body={
          <form
            onSubmit={submitTarif}
            // className="d-flex justify-content-center align-items-center "
            // style={{ marginRight: "50px" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="gap-3 d-flex ">
              <StyledInput
                value={tarif?.titleEn || ""}
                label="TitleEn"
                required
                onChange={(e) => {
                  setTarif((Tarif) => ({ ...Tarif, titleEn: e.target.value }));
                }}
              />
              <StyledInput
                value={tarif?.titleAr || ""}
                label="TitleAr"
                required
                onChange={(e) => {
                  setTarif((Tarif) => ({ ...Tarif, titleAr: e.target.value }));
                }}
              />
              <StyledInput
                value={tarif?.price || ""}
                label="Price"
                type="number"
                required
                onChange={(e) => {
                  setTarif((Tarif) => ({ ...Tarif, price: +e.target.value }));
                }}
              />
            </div>
            <div>
              <TarifSection setTarif={setTarif} tarif={tarif} />
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <CloseButton
                onClick={() => setShowAddTarifModal(false)}
                type={"button"}
              />
              <SaveButton onSubmit={submitTarif} type={"submit"} />
            </div>
          </form>
        }
      />
      <Modal
        toggleShow={() => setShowAddLectureModal(false)}
        basicModal={showAddLectureModal}
        setBasicModal={setShowAddLectureModal}
        normal={true}
        title="Add new Tarif"
        noButtons={true}
        noFooter={true}
        body={
          <form
            onSubmit={submitLecture}
            // className="d-flex justify-content-center align-items-center "
            // style={{ marginRight: "50px" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div>
              <AddLecture
                setLecture={setLecture}
                session={addSession}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <CloseButton
                onClick={() => setShowAddLectureModal(false)}
                type={"button"}
              />
              <SaveButton onSubmit={submitLecture} type={"submit"} />
            </div>
          </form>
        }
      />
      <Modal
        basicModal={deleteModal}
        setBasicModal={setDeleteModal}
        toggleShow={() => setDeleteModal(!deleteModal)}
        ofDelete={true}
        bodOfDelete={
          <div className="d-flex justify-content-center align-items-center">
            {`Are you sure you want to delete `}
            <span style={{ color: "red", margin: "10px" }}>
              {elementToDelete?.title}
            </span>
          </div>
        }
        confirm={handleDeleteLecture}
      />
    </div>
  );
};

export default SessionDetails;
