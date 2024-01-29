import SingleDevice from "../../components/SingleDevice/SingleDevice";
import "./product.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const params = useParams();
  console.log(params);

  let navigate = useNavigate();

  return (
    <div className="product">
      <SingleDevice />
    </div>
  );
};

export default Product;
