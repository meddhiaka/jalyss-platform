import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { CardMedia, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchService, fetchServices } from "../../store/service";
import Carousel from "react-bootstrap/Carousel";
import cardCover from "../../img/cardCover.jpg";
import Modal from "../../components/Commun/Modal";


const useStyles = makeStyles((theme) => ({
  imagesGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: 6,
    marginBottom: 6,
  },
  card: {
    width: "40%",
  },
  media: {
    height: 0,

    paddingTop: "50%",
  },

  topText: {
    marginTop: 2,
  },
  bottomText: {
    marginTop: 2,
  },
}));
function ServiceSpace() {
  const { serviceIdentifier } = useParams();
  const serviceStore = useSelector((state) => state.service);
  const { service, services } = serviceStore;

  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };

  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchService(serviceIdentifier));
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Typography
          variant="h2"
          align="center"
          style={{ color: "purple", marginBottom: 50 }}
        >
          {service?.name}
        </Typography>
        <Carousel>
          {service?.MediaService?.map((image) => (
            <Carousel.Item>
              {image.media ? (
                <img
                  src={image?.media?.path}
                  class="d-block w-100 image-carousel "
                  alt={image?.media?.alt}
                />
              ) : null}
            </Carousel.Item>
          ))}
        </Carousel>

        <p className="secondLine">CHOOSE ONE OF OUR WORKSPACES </p>

        <div className="blogListWrapper">
          {service?.workSpace?.map((space) => (
            <div key={space.id}>
              <div className="blogItemWrapper" style={{ cursor: "pointer" }}>
                {space?.image ? (
                  <img
                    className="blogItemCover"
                    src={space?.image?.path}
                    alt="cover"
                    onClick={() => navigate(`/${space.id}`)}
                  />
                ) : (
                  <img
                    className="blogItemCover"
                    src={cardCover}
                    alt="cover"
                    onClick={() => navigate(`/${space.id}`)}
                  />
                )}
                <div className="chip mt-3" onClick={() => navigate(`/${space.id}`)} >{space?.name}</div>
                <div className="blogItemFooter d-flex justify-content-between mt-1" onClick={() => navigate(`/${space.id}`)}>
                  <div className="d-flex flex-column" onClick={() => navigate(`/${space.id}`)}>
                    <div>
                      <strong>Amenities:</strong> {space?.amenities}
                    </div>
                    <div>
                      <strong>Capacity:</strong> {space?.capacity}
                    </div>
                    <div>
                      <strong>Description:</strong> {space?.description}
                    </div>
                  </div>
                </div>

                <div
                  className="additional-info mt-3"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <div style={{ marginRight: "10px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedWorkspace === space.id}
                          onChange={() => setSelectedWorkspace(space.id)}
                        />
                      }
                      label="Choose"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="firstLine">PRICING</p>
        <p className="secondLine">Price per unit</p>
        <p className="thirdLine">
          We provide several coworking spaces with flexible access that extends
          to 24 hours and 7 days a week for freelancers, business owners, and
          team members.By deciding on the number of workdays every month, you
          can further customize your experience.
        </p>
        <p className="fourthLine">
          To grow your business in a setting that is both professional and
          social, reserve a spot in one of our coworking spaces.
        </p>
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          {service?.tarif.map((item, index) => (
            <div className=" p-3" key={index}>
              <div
                className="card serviceCard"
                style={{
                  borderRadius: 25,
                  transition: "all 1.6s ease-in-out",
                }}
              >
                <div className="card-body service">
                  <h1 className="card-title serviceType">{item.name}</h1>
                  <div className="price">
                    Only <a className="priceNumber"> {item.price}</a>DT
                    <p className="soustitle">Capacity: {item.capacity}</p>
                  </div>
                  <p className="serviceInfo">
                    {item.description.split(",").map((desc, i) => (
                      <span key={i}>
                        {desc}
                        <br />
                      </span>
                    ))}
                  </p>
                  {selectedWorkspace !== "" ? (
                    <button
                      className="btn"
                      style={{
                        width: 200,
                        marginLeft: 25,
                        backgroundColor: "rgb(144, 48, 152)",
                        borderRadius: 30,
                        color: "white",
                        borderColor: "white",
                      }}
                    >
                      <Link
                        to={`/SpaceReservation/${item?.id}/${selectedWorkspace}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Reserve
                      </Link>
                    </button>
                  ) : (
                    <button
                      className="btn"
                      style={{
                        width: 200,
                        marginLeft: 25,
                        backgroundColor: "rgb(144, 48, 152)",
                        borderRadius: 30,
                        color: "white",
                        borderColor: "white",
                      }}
                      onClick={() => {

                        toggleShow()
                      }}
                    >
                      Reserve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="firstLine">Other Services</p>
        <p className="secondLine">ALL IN ONE PLACE </p>
        <p className="thirdLine">
          We provide practical solutions to help you advance your project. A
          wide range of options are available to you, from domiciliation to
          installation in one of our offices.
        </p>
        <p className="fourthLine">
          Look for a workspace that works for you and pick a service that meets
          your needs.
        </p>

        <div className="d-flex flex-wrap justify-content-center align-items-center ">
          {services?.items
            .filter((item) => item.identifier !== serviceIdentifier)
            .map((elem, i) => (
              <div className="col-md-2.5 mx-1" key={i}>
                <img
                  src={elem.cover?.path}
                  alt={elem.cover?.alt}
                  className="card-img-top"
                  style={{
                    borderRadius: 35,
                    marginBottom: -50,
                    height: 250,
                    width: 300,
                  }}
                />
                <div
                  className="card  headerspaceitem"
                  style={{
                    borderRadius: 25,
                    width: 250,
                    left: 26,
                    transition: "all 1.6s ease-in-out",
                  }}
                >
                  <div className="card-body  ">
                    <h5 className="card-title" style={{ marginLeft: 25 }}>
                      {elem.name}
                    </h5>
                    <button
                      className="btn "
                      style={{
                        width: 170,
                        marginLeft: 25,
                        backgroundColor: "rgb(144, 48, 152)",
                        borderRadius: 30,
                        color: "black",
                        borderColor: "white",
                      }}
                    >
                      <Link
                        href={`/spaceJalyss/${elem?.identifier}/${selectedWorkspace}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        {" "}
                        Reserve
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Modal
  basicModal={basicModal}
  normal={true}
  ofDelete={!true}
  toggleShow={toggleShow}
  title={" Alert"}
  body={" You have to choose a workspace"}
  withoutSave={true}
>
</Modal>
    </div>
  );
}
export default ServiceSpace;
