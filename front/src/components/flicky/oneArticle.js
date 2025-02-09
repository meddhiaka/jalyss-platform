// ArticleCard.js
import React from "react";
import Rating from "../Commun/Rating";
import { FiEye } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import "../../assets/styles/card.css";
import { purple } from "@mui/material/colors";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

function OneArticle({ article }) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (handleButtonClick.error) {
      showErrorToast("alredy saved");
    } else {
      addItem(article.ArticlesByBranch[0]);
      showSuccessToast("Article has been saved");
    }
  };

  return (
    <div className="article-card">
      <div className="position-relative">
        <div className="stock-label">
          <h6 className="m-0">{article.ArticlesByBranch[0]?.stock} </h6>
        </div>
        <img
          src={article?.cover.path}
          className="w-100 object-fit-contain article-image "
          alt=""
        />
        <div className="rating-home">
          <Rating edit={false} rating={article?.ArticlesByBranch[0]?.rating} />
        </div>
      </div>
      <p>{article.ArticlesByBranch[0].price}TND</p>
      <p style={{ color: "black" }}>{article.category.nameEn}</p>

      <div className="d-flex flex-column justify-content-between align-items-center mt-2">
        <h6 className="m-0">{article.title}</h6>

        <div className="d-flex  mb-2">
          <div
            style={{ backgroundColor: "white", color: "purple " }}
            className="bg-purple p-1 rounded article-card-icon pointer m-1"
            onClick={() => navigate("/one-article/" + article.id)}
          >
            <FiEye size={20} />
          </div>
          <div
            className="bg-yellow p-1 rounded pointer m-1"
            onClick={handleButtonClick}
          >
            <BsBag size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneArticle;
