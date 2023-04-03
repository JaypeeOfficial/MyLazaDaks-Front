import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  IconButton,
} from "@mui/material";
import {
  CheckBox,
  FilePresent,
  SettingsInputSvideo,
  WindowSharp,
} from "@mui/icons-material";
import { Box, TextField, Modal } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import apiClient from "../apiClient";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { Provider, useDispatch, useSelector } from "react-redux";
import { data } from "jquery";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import { ADD_PRODUCT } from "../actions";
import { convertLength } from "@mui/material/styles/cssUtils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  height: 530,
  bgcolor: "background.paper",
  boxShadow: 15,
  p: 4,
};

export const AddProductModal = ({ openProduct, setOpenProduct }) => {
  const handleClose = () => setOpenProduct(false);

  var fetchProduct = useSelector((state) => state.fetchProduct);

  const dispatch = useDispatch();

  var user = useSelector((state) => state.user);

  const [categoryDropdown, setCategoryDrop] = useState([]);
  const [products, setProduct] = useState([]);

  const [tempVal, setTempVal] = useState([]);

  const schema = yup.object().shape({
    formData: yup.object().shape({
      productCode: yup.string(),
      productName: yup.string(),
      itemCategoryId: yup.number(),
      price: yup.number(),
      imagepath: yup.string(),
    }),
  });

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      formData: {
        productCode: "",
        productName: "",
        itemCategoryId: "",
        price: "",
        imagePath: "",
        addedBy: user?.fullName,
      },
    },
  });

  const fetchItemCategoryApi = async () => {
    const res = await apiClient.get("ItemCategory/GetAllItemCategory");
    return res.data;
  };

  const fetchItemCategory = () => {
    fetchItemCategoryApi().then((res) => {
      setCategoryDrop(res);
    });
  };

  useEffect(() => {
    fetchItemCategory();

    return () => {
      setCategoryDrop([]);
    };
  }, []);

  const onSaveClick = async (data) => {
    const res = apiClient
      .post("Product/AddNewProduct", data.formData)
      .then((res) => {
        //const pub = process.env.PUBLIC_URL.console.log(pub);

        handleClose();
        Swal.fire("Successfully added new product!", "", "success");

        dispatch(ADD_PRODUCT(res.data));

        // console.log(res);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Ooops...",
          text: { errors },
        });
      });
  };

  const imageHandler = (e) => {
    setValue("formData.imagePath", "/image/" + e.target.files[0].name);
    setTempVal(e.target.files[0].name);
  };

  // console.log(watch("formData"));

  return (
    <Modal
      open={openProduct}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit(onSaveClick)}>
        <Box sx={style}>
          <Typography
            variant="h5"
            align="center"
            sx={{
              marginBottom: "20px",
              letterSpacing: 3,
              fontFamily: "Monospace",
            }}
          >
            Add New Product
          </Typography>

          <div>
            <TextField
              id="productcode"
              label="Product Code"
              variant="outlined"
              placeholder="Product Code"
              color="warning"
              sx={{
                marginBottom: "20px",
                boxShadow: 10,
                borderRadius: "5px",
                "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                  borderColor: "PINK",
                },
              }}
              fullWidth
              {...register("formData.productCode")}
            />
          </div>

          <div>
            <TextField
              id="productname"
              label="Product Name"
              variant="outlined"
              placeholder="Product Name"
              color="warning"
              sx={{
                marginBottom: "20px",
                boxShadow: 10,
                borderRadius: "5px",
                "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                  borderColor: "PINK",
                },
              }}
              fullWidth
              {...register("formData.productName")}
            />
          </div>

          <FormControl fullWidth>
            <InputLabel color="warning" placeholder="Item Category">
              Item Category
            </InputLabel>

            <Controller
              control={control}
              name="formData.itemCategoryId"
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  label="Category"
                  color="warning"
                  sx={{
                    marginBottom: "20px",
                    boxShadow: 10,
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                      borderColor: "PINK",
                    },
                  }}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                >
                  {categoryDropdown?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.itemCategoryName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <div>
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              placeholder="Price"
              color="warning"
              sx={{
                marginBottom: "20px",
                boxShadow: 10,
                borderRadius: "5px",
                "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                  borderColor: "PINK",
                },
              }}
              fullWidth
              {...register("formData.price")}
            />
          </div>

          <div>
            <TextField
              id="imagepath"
              variant="outlined"
              placeholder="Upload Photo"
              color="warning"
              disabled
              value={tempVal}
              sx={{
                marginBottom: "20px",
                boxShadow: 10,
                borderRadius: "5px",
                "& .MuiOutlinedInput-root.Mui-focused fieldset ": {
                  borderColor: "PINK",
                },
              }}
              fullWidth
            />
          </div>

          <div>
            <Button
              component="label"
              fullWidth
              size="large"
              sx={{
                boxShadow: 5,
                marginBottom: "20px",
                bgcolor: "pink",
                color: "white",
              }}
            >
              Select Image
              <input type="file" hidden onChange={imageHandler} />
            </Button>
          </div>

          <Button
            type="submit"
            sx={{
              bgcolor: "pink",
              boxShadow: 10,
              color: "white",
              marginLeft: "30px",
              width: 150,
            }}
          >
            Submit
          </Button>

          <Button
            onClick={handleClose}
            sx={{
              bgcolor: "pink",
              boxShadow: 10,
              color: "white",
              marginLeft: "30px",
              width: 150,
            }}
          >
            Cancel..
          </Button>
        </Box>
      </form>
    </Modal>
  );
};
