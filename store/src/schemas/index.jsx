/* eslint-disable react-refresh/only-export-components */
import * as Yup from "yup";

// purchaseSchema
const SALESNAME = "Enter Sales Name";
const CATEGORYNAME = "Select Category Name";
const SUBCATEGORYNAME = "Select Sub Category Name";
const SALESPRICE = "Enter Sales Price";
const SALESQUNTIRY = "Enter Sales Quantity";
const SALESADDRESS = "Enter Sales Addrsee";
const SALESDESCRIPTION = "Enter Sales Description";

// registrationSchema
const EMAILV = "Enter Valid Email";
const EMAILR = "Email is Required";
const ADDRESS = "Enter Address";
const FIRSTNAME = "Enter First Name";
const LASTNAME = "Enter Last Name";
const DOBDE = "Enter Date of Birth";

export const purchaseSchema = Yup.object({
  salesName: Yup.string().min(2).max(25).required(SALESNAME),
  categoryName: Yup.object().required(CATEGORYNAME),
  subCategoryName: Yup.object().required(SUBCATEGORYNAME),
  salesPrice: Yup.number().min(1).max(25).required(SALESPRICE),
  salesquantity: Yup.number().min(1).max(25).required(SALESQUNTIRY),
  salesAddrsee: Yup.string().min(1).max(500).required(SALESADDRESS),
  salesDescription: Yup.string().min(1).max(500).required(SALESDESCRIPTION),
});
export const registrationSchema = Yup.object({
  email: Yup.string().email(EMAILV).required(EMAILR),
  firstName: Yup.string().min(2).max(25).required(FIRSTNAME),
  lastName: Yup.string().min(2).max(25).required(LASTNAME),
  address: Yup.string().min(2).max(25).required(ADDRESS),
  phoneNumber: Yup.string()
  .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
  .required("Phone number is required"),
  DOB: Yup.string().required(DOBDE),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Password is Required"),
});
