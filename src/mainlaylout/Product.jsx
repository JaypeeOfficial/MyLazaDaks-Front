import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid, Skeleton } from "@mui/material";
import { CardProduct } from "./cardmedia";
import { useState } from "react";
import apiClient from "../apiClient";
import { useEffect } from "react";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { SET_PRODUCT } from "../actions";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Product() {
  const [products, setProduct] = useState([]);

  const product = useSelector((state) => state.product);

  const [loading, setLoading] = useState(true);

  const skeletonArray = Array(3).fill("");

  const dispatch = useDispatch();

  const fetchProductApi = async () => {
    const res = await apiClient.get("Product/GetAllProducts");

    dispatch(SET_PRODUCT(res.data));

    return res.data;
  };

  const fetchProduct = () => {
    fetchProductApi().then((res) => {
      setProduct(res);

      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProduct();

    return () => {
      setProduct([]);
    };
  }, []);

  console.log(products);

  return (
    <Stack
      direction="row"
      display="flex"
      flexWrap="wrap"
      sx={{
        flexWrap: "wrap",
        gap: 7,
      }}
    >
      {loading &&
        skeletonArray.map((item, index) => (
          <Card
            key={index}
            sx={{
              height: "400px",
              width: "350px",
              marginRight: "50px",
            }}
          >
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton
              variant="rectangle"
              height={200}
              sx={{
                justifyContent: "center",
                marginBottom: "10px",
              }}
            />
            <Skeleton variant="rectangle" height={60} />
          </Card>
        ))}

      {product.map((products, i) => (
        <CardProduct index={i} {...products} key={i} />
      ))}
    </Stack>
  );
}

export default Product;
