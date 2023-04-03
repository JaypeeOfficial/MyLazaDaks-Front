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
import { Grid } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import moment from "moment/moment";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Swal from "sweetalert2";
import apiClient from "../apiClient";
import { useDispatch } from "react-redux";
import { DELETE_PRODUCT } from "../actions";

export const CardProduct = (props) => {
  const {
    imagePath,
    productContent,
    productCode,
    productName,
    dateAdded,
    price,
    id,
    index,
  } = props;

  const dispatch = useDispatch();

  const [oneColor, setColor] = useState("");

  const RedColor = () => {
    setColor("#FDA4BA");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((response) => {
      if (response.isConfirmed) {
        var response = apiClient.delete(`Product/DeleteProduct/${id}`);

        Swal.fire("Deleted!", "Product has been deleted.", "success");
        dispatch(DELETE_PRODUCT(id));
      }
    });
  };

  return (
    <Card
      sx={{
        minWidth: "25%",
        marginLeft: "50px",
        boxShadow: 5,
      }}
    >
      <CardHeader
        sx={{
          fontWeight: "bold",
        }}
        titleTypographyProps={{
          fontWeight: "bold",
          variant: "h5",
          fontFamily: "Century Gothic",
        }}
        subheaderTypographyProps={{
          fontStyle: "italic",
        }}
        avatar={
          <Avatar
            sx={{
              bgcolor: "#ff726f",
              width: "90px",
              height: "90px",
              boxShadow: 5,
            }}
          >
            ₱
            {price?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </Avatar>
        }
        title={productCode}
        subheader={moment(dateAdded).format("LL")}
        action={
          <IconButton
            aria-label="settings"
            onClick={() => {
              handleDelete(id);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        }
      />

      <CardMedia component="img" height="250" image={imagePath} alt="Sample" />

      <div
        style={{
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <Avatar
          sx={{
            position: "absolute",
            top: 0,
            right: 110,
            marginTop: "-20px",
            boxShadow: 5,
            bgcolor: "white",
          }}
        >
          <IconButton
            aria-label="add to favorites"
            onClick={RedColor}
            sx={{
              color: oneColor,
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </Avatar>

        <Avatar
          sx={{
            position: "absolute",
            top: 0,
            right: 60,
            marginTop: "-20px",
            boxShadow: 5,
            bgcolor: "white",
          }}
        >
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Avatar>

        <Avatar
          sx={{
            position: "absolute",
            top: 0,
            right: 10,
            marginTop: "-20px",
            boxShadow: 5,
            bgcolor: "white",
          }}
        >
          <IconButton aria-label="share">
            <ShoppingCartIcon />
          </IconButton>
        </Avatar>
      </div>

      <CardContent>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#ff726f",
          }}
        >
          {productName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: "normal",
          }}
        >
          {productContent}
        </Typography>
      </CardContent>
    </Card>
  );
};
