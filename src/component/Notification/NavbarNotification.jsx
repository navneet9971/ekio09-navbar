import React, { useState, useEffect } from "react";
import axiosInstance from "../../interceptors/axios";

function NavbarNotification() {
  const [productName, setProductName] = useState("");
  const [notifiData, setNotifiData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [productDropdown, setProductDropdown] = useState([]); // state for product dropdown

  const handleProductChange = (event) => {
    const value = event.target.value;
    setProductName(value);

    // send the product input by the user to the backend to get product recommendations
    axiosInstance
      .get(`/products?product=${value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => {
        setProductDropdown(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong. Please try again later.");
      });
  };

  useEffect(() => {
    if (showTable) {
      axiosInstance
        .get(`notifications/?product=${productName}`)
        .then((response) => {
          const notificationData = response.data;
          setNotifiData(notificationData);
          console.log(notificationData);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [showTable, productName]);

  const handleGoButtonClick = () => {
    if (!productName) {
      alert("Please fill the Product Name");
      return;
    }
    setShowTable(true);
  };

  const handleBackButtonClick = () => {
    setShowTable(false);
    setProductName("");
  };

  // Function to handle the product dropdown click
  const handleProductDropdownClick = (product) => {
    setProductName(product);
    setProductDropdown([]);
  };

  // Component for product dropdown
  const ProductDropdown = (props) => {
    const { dropDownData, inputValue } = props;
  
    // Filter the product names based on the input value
    const filteredProducts = dropDownData.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  
    // Function to highlight the search term in the product name
    const highlightSearchTerm = (productName) => {
      const regex = new RegExp(`(${inputValue})`, "gi");
      return productName.replace(regex, "<mark>$1</mark>");
    };
  
    return (
      <div
        className=""
        style={{
          width: "100%",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 0px 8px #ddd",
          borderRadius: "10px",
          marginLeft: "0rem",
          marginTop: "0.2rem",
          maxHeight: "90px",
          overflow: "hidden",
          padding: "0px 14px",
          border: "#7bdcb5 solid 2px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.overflowY = "scroll";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.overflowY = "hidden";
        }}
      >
        {filteredProducts.slice(0, 5).map((item, index) => (
          <span
            key={index}
            value={item}
            style={{
              animationDuration: "300ms",
              opacity: 1,
              height: "auto",
              visibility: "visible",
              color: "black",
              cursor: "pointer",
            }}
            onClick={() => handleProductDropdownClick(item.name)}
            dangerouslySetInnerHTML={{
              __html: highlightSearchTerm(item.name),
            }}
          />
        ))}
      </div>
    );
  };
  



  return (
    <div>
      {showTable ? (
        <div>
          <button
            style={{
              padding: "4px 7px",
              fontSize: "14px",
              color: "#fff",
              background: "#082a71",
              borderRadius: "7px",
            }}
            onClick={handleBackButtonClick}
          >
            Back
          </button>
          <h3 style={{ textAlign: "center" }}>Notification</h3>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Category</th>
                <th>Content</th>
                <th>External Link/Filepath</th>
                <th>Status</th>
                <th className="Notifi">Date</th>
              </tr>
            </thead>
            <tbody>
              {notifiData.length > 0 ? (
                notifiData.map((data, index) => (
                  <tr key={index}>
                    <td style={{ cursor: "default" }}>{index + 1}</td>
                    <td style={{ cursor: "default" }}>{data.category}</td>
                    <td style={{ cursor: "default" }}>{data.content}</td>
                    <td>
                      <a
                        href={data.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#55B600", fontWeight: "bold" }}
                      >
                        Download Document
                      </a>
                    </td>
                    <td style={{ cursor: "default" }}>{data.status}</td>
                    <td style={{ cursor: "default" }}>{data.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No notifications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "5px" }}>
          <input
            style={{
              padding: "10px 6px",
              borderRadius: "7px",
              fontSize: "15px",
              border: "3px solid #082a71",
            }}
            type="text"
            placeholder="Enter Name of Product"
            value={productName}
            onChange={handleProductChange}
          />
         {productName && productDropdown.length > 0 && (
  <ProductDropdown dropDownData={productDropdown} inputValue={productName} />
)}
          <button
            style={{
              padding: "10px 0px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#fff",
              background: "#082a71",
              borderRadius: "7px",
              cursor: "pointer",
            }}
            onClick={handleGoButtonClick}
          >
            Go
          </button>
        </div>
      )}
    </div>
  );
}

export default NavbarNotification;
