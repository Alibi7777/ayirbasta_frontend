import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";

import BarterMenu from "components/BarterMenu";
import Header from "components/Header";
import AddOfferStyled from "./AddOffer.styled";
import apiClient from "api/apiClient";

const AddOffer = () => {
  const { contextData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [carName, setCarName] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carMileage, setCarMileage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const selectFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("category", category);
    formData.append("images", image);
    if (category === "Cars") {
      formData.append("carName", carName);
      formData.append("carYear", carYear);
      formData.append("carColor", carColor);
      formData.append("carMileage", carMileage);
    } else {
      formData.append("name", name);
      formData.append("description", description);
    }
    apiClient
      .post("/v1/items", formData, {
        headers: {
          Authorization: `Bearer ${contextData.token}`,
        },
      })
      .then(() => navigate("/items"));
  };

  return (
    <>
      <Header />
      <AddOfferStyled>
        <BarterMenu linkActive="offers" />
        <form className="cont" onSubmit={handleSubmit}>
          <div className="offer">
            <div className="info">
              <div>
                <h3>Item Info</h3>
                <p>Please enter your item info</p>
              </div>
            </div>
            <div className="offer-product">
              <div className="product-info">
                <div>
                  <h4>Category</h4>
                  <select
                    name="Category"
                    id="category"
                    required
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Choose category
                    </option>
                    <option value="Cars">Cars</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Sports">Sports</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Music">Music</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                {category === "Cars" ? (
                  <>
                    <div>
                      <h4>Car Name</h4>
                      <input
                        type="text"
                        placeholder="Car Name"
                        required
                        onChange={(e) => setCarName(e.target.value)}
                      />
                    </div>
                    <div>
                      <h4>Year</h4>
                      <input
                        type="number"
                        placeholder="Year"
                        required
                        onChange={(e) => setCarYear(e.target.value)}
                      />
                    </div>
                    <div>
                      <h4>Color</h4>
                      <input
                        type="text"
                        placeholder="Color"
                        required
                        onChange={(e) => setCarColor(e.target.value)}
                      />
                    </div>
                    <div>
                      <h4>Mileage</h4>
                      <input
                        type="number"
                        placeholder="Mileage (km)"
                        required
                        onChange={(e) => setCarMileage(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4>Item Name</h4>
                      <input
                        type="text"
                        placeholder="Item name"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <h4>Description</h4>
                    <textarea
                      name="description"
                      id="description"
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </>
                )}
                <h4>Image</h4>
                <input
                  name="image"
                  id="image"
                  type="file"
                  onChange={selectFile}
                  accept="image/*"
                  required
                />
              </div>
            </div>
          </div>
          <button>ADD OFFER</button>
        </form>
      </AddOfferStyled>
    </>
  );
};

export default AddOffer;
