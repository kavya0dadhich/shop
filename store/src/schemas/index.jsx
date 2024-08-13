/* eslint-disable react-refresh/only-export-components */
import * as Yup from "yup";

const SALESNAME = "Enter Sales Name";
const CATEGORYNAME = "Select Category Name";
const SUBCATEGORYNAME = "Select Sub Category Name";
const SALESPRICE = "Enter Sales Price";
const SALESQUNTIRY = "Enter Sales Quantity";
const SALESADDRESS = "Enter Sales Addrsee";
const SALESDESCRIPTION = "Enter Sales Description";

export const purchaseSchema = Yup.object({
  salesName: Yup.string().min(2).max(25).required(SALESNAME),
  categoryName: Yup.object().required(CATEGORYNAME),
  subCategoryName: Yup.object().required(SUBCATEGORYNAME),
  salesPrice: Yup.number().min(1).max(25).required(SALESPRICE),
  salesquantity: Yup.number().min(1).max(25).required(SALESQUNTIRY),
  salesAddrsee: Yup.string().min(1).max(500).required(SALESADDRESS),
  salesDescription: Yup.string().min(1).max(500).required(SALESDESCRIPTION),
});
