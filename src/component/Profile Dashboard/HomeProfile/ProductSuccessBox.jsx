import React from "react";

const ProductSuccessBox = ({ index, product, success, onChange }) => {
  const handleProductChange = (event) => {
    const { value } = event.target;
    onChange(index, "product", value);
  };

  const handleSuccessChange = (event) => {
    const { value } = event.target;
    onChange(index, "success", value);
  };

  return (
    <div>
      <input
        type="text"
        name="product"
        value={product}
        onChange={handleProductChange}
        placeholder="Product"
      />
      <input
        type="text"
        name="success"
        value={success}
        onChange={handleSuccessChange}
        placeholder="Success"
      />
    </div>
  );
};

export default ProductSuccessBox;
