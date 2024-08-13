export const CategoryListApi = async () => {
  try {
    const res = await fetch("http://localhost:3000/categoryList");
    const data = await res.json();
    if (data.result) return data.result;
    return data;
  } catch (error) {
    return error;
  }
};
export const MLApi = async () => {
  try {
    const res = await fetch("http://localhost:3000/ML_List");
    const data = await res.json();
    if(data.result) return data.result
    return data
  } catch (error) {
    return error;
  }
};
export const ProductLApi = async () => {
  try {
    const res = await fetch("http://localhost:3000/productList");
    const data = await res.json();
    if(data.result) return data.result
    return data
  } catch (error) {
    return error;
  }
};
