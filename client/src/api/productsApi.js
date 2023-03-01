import axios from "axios";
async function addProduct(formData) {
  try {
    const response = await axios.post("/api/products/create", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error?.response?.data?.msg);
  }
}

async function getProducts(pageNum) {
  const page = pageNum ? pageNum : 1;
  console.log({ pageNum, page });
  try {
    const response = await axios.get("/api/products/", {
      params: {
        page,
      },
    });
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error?.response?.data?.msg);
  }
}
async function updateProducts(id, formData) {
  try {
    const response = await axios.patch(`/api/products/update/${id}`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error?.response?.data?.msg);
  }
}

export { addProduct, getProducts, updateProducts };
