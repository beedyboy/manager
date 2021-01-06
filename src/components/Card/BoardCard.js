import React, { Fragment } from "react";
import ReactHtmlParser from "react-html-parser";

const BoardCard = (data) => {
  return (
    <Fragment>
      <div className="card border-0 ">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                src={data.images}
                className="card-img-top"
                alt="avatar"
              />
              <div className="card-body text-center ">
                <h5 className="card-title mb-0">{data.lastname+ " "+ data.firstname}</h5>
                <div className="card-text text-black-50">
                  {data.position || "-"}
                </div>
              </div>
            </div>
            <div className="flip-card-back">
              <h1 className="person text- ">{data.lastname+ " "+ data.firstname}</h1>
              <p className="description text-black-50">
              {ReactHtmlParser(data && data.description)}
              </p>
              <a href="#" className="fa fa-facebook"></a>{" "}
              <a href="#" className="fa fa-twitter"></a>{" "}
              <a href="#" className="fa fa-linkedin"></a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BoardCard;
