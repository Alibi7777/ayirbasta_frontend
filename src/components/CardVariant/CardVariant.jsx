import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "api/apiClient";
import { ReactComponent as HeartIcon } from "assets/img/heart.svg";
import Button from "components/Button/Button";
import { AuthContext } from "context/AuthContext";

const CardVariant = ({
  image,
  serviceName,
  category,
  description,
  id,
  isRecommended,
  likeCount: initialLikeCount = 0,
  isLiked: initialIsLiked = false,
  carName,
  carYear,
  carColor,
  carMileage,
}) => {
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const { contextData } = useContext(AuthContext);

  // Debugging: Log received props
  console.log("Card Data:", {
    id,
    category,
    carName,
    carYear,
    carColor,
    carMileage,
  });

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      const response = await apiClient.post(
        `/v1/items/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${contextData.token}`,
          },
        }
      );
      setLikeCount(response.data.likeCount);
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="products-and-service-cards-variant">
      {isRecommended && <div className="recommendation-badge">Recommended</div>}
      <img
        src={image.charAt(0) === "h" ? image : `http://localhost:8080${image}`}
        alt={serviceName}
        className="cards-variant-image-product"
      />
      <div
        className="products-and-service-card-text"
        style={{ position: "relative" }}
      >
        <div className="products-and-service-card-text-product">
          <p className="product-or-barter-title">
            {category === "Cars" ? carName || "No Name Provided" : serviceName}
          </p>
          <p className="below-text">{category}</p>

          {/* Ensure car details display correctly */}
          {category === "Cars" ? (
            <div className="car-details">
              <p className="below-text">
                <strong>Year:</strong> {carYear ? carYear : "N/A"}
              </p>
              <p className="below-text">
                <strong>Color:</strong> {carColor ? carColor : "N/A"}
              </p>
              <p className="below-text">
                <strong>Mileage:</strong>{" "}
                {carMileage ? `${carMileage} km` : "N/A"}
              </p>
            </div>
          ) : (
            <p className="below-text">{description}</p>
          )}
        </div>

        <div className="products-and-service-card-button">
          <button
            className={`like-button ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
            style={{
              position: "absolute",
              top: 0,
              right: "5px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              justifyContent: "center",
              background: "none",
            }}
          >
            <HeartIcon />
            <span>{likeCount}</span>
          </button>

          <Link to={`/product/${id}`}>
            <Button style={{ background: "#DE8807", height: 44 }}>
              OPEN CARD
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardVariant;
