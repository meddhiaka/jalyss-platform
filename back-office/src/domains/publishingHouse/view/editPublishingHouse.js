import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { rows } from "../../../constants/publishingHouseData";
import { Button } from "react-bootstrap";
import { IoIosPersonAdd } from "react-icons/io";
import publishingHouse, {
  updatePublishingHouse,
  fetchPublishingHouse,
} from "../../../store/publishingHouse";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { LuImagePlus } from 'react-icons/lu';

function EditPublishingHouse() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [path, setPath] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const PublishingHouse = useSelector(
    (state) => state.publishingHouse.publishingHouse
  );
  useEffect(() => {
    dispatch(fetchPublishingHouse(id));
  }, [PublishingHouse?.items, path]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      name: name ? name : PublishingHouse.name,
      address: address ? address : PublishingHouse.address,
    };

    if (selectedFile !== null) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_UPLOAD_ENDPOINT}/upload`,
          formData
        );
        body.logoId = response.data.id;
      } catch (error) {
        console.error("Error uploading selectedFile image:", error);
      }
    }

    dispatch(updatePublishingHouse({ id, ...body })).then((res) => {
      if (!res.error) {
        showSuccessToast("Publishing house updated");
        Navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="container">
            <div
              className="d-flex mb-2"
              style={{ justifyContent: "center" }}
            >
              <div
                className="position-relative"
                style={{ height: 200, width: 300 }}
              >
                <img
                  className="img-fluid mt-1"
                  src={
                    selectedFile ? URL.createObjectURL(selectedFile) : (PublishingHouse?.logo?.path || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&usqp=CAU")
                  }
                  alt="Card image cap"
                  style={{ height: "100%", width: "100%", borderRadius: "8px", filter: "blur(0.5px)" }}
                />
                <div className="position-absolute top-50 start-50 translate-middle">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleButtonClick}
                    style={{backgroundColor:"rgba(0, 0, 0, 0.456)"}}
                  >
                    <LuImagePlus fontSize={35} color="white" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-6 mt-3">
                <label>Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder={PublishingHouse?.name}
                />
              </div>
              <div className="form-group col-6 mt-3">
                <label>Address</label>
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  placeholder={PublishingHouse?.address}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="form-group col-6 mt-3"></div>
            </div>

            <div className="w-100 d-flex justify-content-center">
              <button
                type="submit"
                className="confirm-button mt-5   mb-3"
                onClick={handleSubmit}
              >
                <span className="label-btn"> Edit Publishing House </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPublishingHouse;
