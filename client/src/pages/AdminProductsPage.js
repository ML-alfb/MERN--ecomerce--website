import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/productsApi";
import AddProductForm from "./components/AddProductForm";
import AdminProductsTabel from "./components/AdminProductsTabel";
import DashbordBar from "./components/DashbordBar";
import PaginitionComponent from "./components/PaginitionComponent";
function AdminProductsPage() {
  const [data, setdata] = useState();
  const [model, setmodel] = useState(false);
  const [index, setindex] = useState();
  const { page } = useParams();
  const [productsCount, setProductsCount] = useState();
  const find = (id) => {
    return data.find((item) => item._id === id);
  };
  const getPrs = async (page) => {
    try {
      const data1 = await getProducts(page);
      // console.log(data1);
      setProductsCount(parseInt(data1.productsCount));
      setdata(data1.msg);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("1");
    getPrs(page);
  }, [page]);
  return (
    <section className=" flex  ">
      {index && model && (
        <div className="edit-product-modele">
          <div className="remove-medel" onClick={() => setmodel(false)}></div>
          <AddProductForm
            productInfoToUpdate={{
              productID: find(index)._id,
              posterUp: find(index).images.posterUrl,
              nameUp: find(index).name,
              stockUp: find(index).stock,
              priceUp: find(index).price,
              descriptionUp: find(index).description,
              discountUp: find(index).discount,
              catygoryUp: find(index).catygory,
              publishedUp: find(index).published,
            }}
            toUpdate={true}
            setmodel={setmodel}
            s
          />
        </div>
      )}

      <DashbordBar />

      <div className="main--section">
        <div className="table--section">
          {data?.length ? (
            <AdminProductsTabel
              products={data}
              setmodel={setmodel}
              setindex={setindex}
            />
          ) : (
            ""
          )}
        </div>
        {productsCount && (
          <PaginitionComponent
            productsCount={productsCount}
            urlPath={"/dashbord/products/"}
            productsParPage={7}
          />
        )}
      </div>
    </section>
  );
}

export default AdminProductsPage;
