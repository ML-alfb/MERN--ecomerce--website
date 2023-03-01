import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/paginitionCss.css";

function PaginitionComponent(props) {
  const { productsCount, urlPath, productsParPage } = props;
  //   const [currentPage, setCurrentPage] = useState(1);
  const { page } = useParams();
  const Page = page ? page : 1;
  const [currentPage, setCurrentPage] = useState(parseInt(Page));

  const pagesNumber = Math.ceil(productsCount / productsParPage);

  const [minPageNumberLimit, setMinPageNumberLimit] = useState();
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState();
  useEffect(() => {
    let y = currentPage;
    let max = 0;
    let min = 0;

    if (pagesNumber >= y + 5 && (y + 5) % 5 === 0) {
      max = y;
      min = y - 5;
    } else if (pagesNumber >= y + 5) {
      let m = y;
      while (m % 5 !== 0) {
        m += 1;
      }
      max = m;
      min = m - 5;
    } else {
      max = pagesNumber;
      min = pagesNumber - 5;
    }
    setMaxPageNumberLimit(max);
    setMinPageNumberLimit(min);
  }, []);

  let pages = [];
  for (let i = 0; i < pagesNumber; i++) {
    pages.push(i + 1);
  }
  const currentPages = pages.slice(minPageNumberLimit, maxPageNumberLimit);
  const handleClick = (e) => {
    setCurrentPage(() => e);

    if (e === maxPageNumberLimit && maxPageNumberLimit !== e * productsCount) {
      const addPages = pagesNumber - e > 5 ? 3 : pagesNumber - e;
      setMaxPageNumberLimit((prev) => prev + addPages);
      setMinPageNumberLimit((prev) => prev + addPages);
    }
    if (e - 1 === minPageNumberLimit && e !== 1) {
      const subtractPages = e - 1 > 5 ? 3 : e - 1;
      setMaxPageNumberLimit((prev) => prev - subtractPages);
      setMinPageNumberLimit((prev) => prev - subtractPages);
    }
  };
  const handlePreviousBtn = (e) => {
    setCurrentPage((prev) => prev - 1);
    if (e - 1 === minPageNumberLimit && e !== 1) {
      const subtractPages = e - 5 > 5 ? 5 : e - 1;
      setMaxPageNumberLimit((prev) => prev - subtractPages);
      setMinPageNumberLimit((prev) => prev - subtractPages);
    }
  };

  const handleNextBtn = (e) => {
    setCurrentPage((prev) => prev + 1);
    if (e === maxPageNumberLimit && maxPageNumberLimit !== e * productsCount) {
      const addPages = pagesNumber - e > 5 ? 5 : pagesNumber - e;
      setMaxPageNumberLimit((prev) => prev + addPages);
      setMinPageNumberLimit((prev) => prev + addPages);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        // backgroundColor: "red",
        justifyContent: "space-between",
        marginTop: "10px",
      }}
    >
      <ul
        className="ul "
        style={{
          width: "40%",
          // backgroundColor: "green",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <li className="paginition_li fex">
          {!(currentPage === 1) ? (
            <Link
              className="paginition_link"
              to={`${urlPath}${currentPage - 1}`}
              onClick={() => handlePreviousBtn(currentPage)}
            >
              Previous
            </Link>
          ) : (
            ""
          )}
        </li>
        <ul
          style={{
            width: "50%",
            backgroundColor: "crey",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          {currentPages.map((number) => {
            return (
              <li
                key={number}
                className={`paginition_li ${
                  currentPage === number ? "active" : ""
                }`}
                onClick={() => handleClick(number)}
              >
                <Link className="paginition_link" to={`${urlPath}${number}`}>
                  {number}
                </Link>
              </li>
            );
          })}
        </ul>
        <li className="paginition_li fex">
          {!(currentPage > pagesNumber - 1) ? (
            <Link
              className="paginition_link"
              to={`${urlPath}${currentPage + 1}`}
              onClick={() => handleNextBtn(currentPage)}
            >
              Next
            </Link>
          ) : (
            ""
          )}
        </li>
      </ul>
    </div>
  );
}

export default PaginitionComponent;
