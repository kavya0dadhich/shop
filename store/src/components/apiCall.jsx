export const CategoryListApi = async () => {
  try {
    const res = await fetch("http://localhost:3000/categoryList", {
      credentials: "include",
    });
    const data = await res.json();
    if (data.result) return data.result;
    return data;
  } catch (error) {
    return error;
  }
};
export const MLApi = async () => {
  try {
    const res = await fetch("http://localhost:3000/ML_List", {
      credentials: "include",
    });
    const data = await res.json();
    if (data.result) return data.result;
    return data;
  } catch (error) {
    return error;
  }
};
export const ProductLApi = async () => {
  try {
    const res = await fetch("http://localhost:3000/productList", {
      credentials: "include",
    });
    const data = await res.json();
    if (data.result) return data.result;
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
export const SubCategorieslist = async () => {
  try {
    const res = await fetch("http://localhost:3000/SubCategorieslist", {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data.result);
    if (data.result) return data.result;
    return data;
  } catch (error) {
    return error;
  }
};
export const OstockListApi = async () => {
  try {
    const res = await fetch("http://localhost:3000/OstockList", {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (data.result) return data.result;
  } catch (error) {
    return error;
  }
};
export const TotalStockListApi = async () => {
  try {
    const res = await fetch("http://localhost:3000/totalStockList", {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (data.totalStock) return data.totalStock;
  } catch (error) {
    return error;
  }
};
