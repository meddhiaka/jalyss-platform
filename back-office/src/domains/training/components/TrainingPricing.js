import React from "react";

import TrainingHeading from "./TrainingHeading";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

const TrainingPricing = ({ session, fn, header, readOnly, onDeleteTarif }) => {
  return (
    <div>
      {!header && (
        <TrainingHeading
          subtitle="PRICING"
          title="Choose The Right Plan"
          mt={20}
          mb={40}
        />
      )}

      <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 mb-5 ">
        {session.tarifs.map((tarif, i) => (
          <div className="text-center position-relative" key={i}>
            {!readOnly && (
              <div
                className="d-flex position-absolute top-0 end-0 m-3 p-2 transformScale"
                style={{
             
                  borderRadius: "50%",
                  cursor:"pointer"
                }}
              >
                <i className="text-danger " onClick={() => onDeleteTarif(i)}>
                  <FaTrash />
                </i>
              </div>
            )}

            <div className="bg-white p-3 rounded-lg shadow">
              <h1 className="h6 text-uppercase font-weight-bold mb-4">
                {tarif.titleEn}
              </h1>
              <div className="d-flex justify-content-center gap-2">
                <h2 className="h1 font-wieght-bold">{tarif.price}</h2>{" "}
                <span className="mt-3">TND</span>
              </div>

              <div
                className="custom-seperator my-4 mx-auto"
                style={{ backgroundColor: "#48184c" }}
              ></div>
              <ul className="list-unstyled my-5 text-small text-left">
                {(() => {
                  const sortedFeatures = tarif.features
                    ?.slice()
                    .sort((a, b) => {
                      if (a.isAvailable && !b.isAvailable) {
                        return -1;
                      } else if (!a.isAvailable && b.isAvailable) {
                        return 1;
                      }
                      return 0;
                    });

                  return sortedFeatures.map((feature, idx) => (
                    <li
                      className={`mb-3 ${
                        feature.isAvailable
                          ? ""
                          : "text-muted text-decoration-line-through"
                      }`}
                      key={idx}
                    >
                      {feature.isAvailable ? (
                        <FaCheck color="#48184c" />
                      ) : (
                        <FaTimes color="gray" />
                      )}{" "}
                      {feature?.labelEn || feature?.feature?.labelEn}
                    </li>
                  ));
                })()}
              </ul>
              {!readOnly && (
                <button
                  type="button"
                  className="btn btn-block p-2 shadow rounded-pill "
                  style={{
                    backgroundColor: "#48184c",
                    color: "#fff",
                    width: "200px",
                  }}
                  id="basic-primary-trigger"
                  onClick={() => {
                    console.log(tarif, i, "pricing card");
                    fn(tarif, i);
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
        {/* <Modal
          setBasicModal={setBasicModal}
          basicModal={basicModal}
          toggleShow={toggleShow}
          body={
            isError ? (
              <div className="d-flex flex-column justify-content-center align-items-center mb-3">
                <DisplayLottie
                  animationData={warning}
                  style={{ width: "120px", height: "120px" }}
                />
                <span>You are alredy Subscribed !</span>
              </div>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center mb-3">
                <DisplayLottie
                  animationData={done}
                  style={{ width: "120px", height: "120px" }}
                />
                <div className="text-center">
                  Reservation has been created successfully. We will contact you
                  soon for the confirmation.
                </div>
              </div>
            )
          }
          normal={true}
          title={isError ? "Error" : "Success Reservation"}
          withoutSave={true}
        /> */}
      </div>
    </div>
  );
};

export default TrainingPricing;
