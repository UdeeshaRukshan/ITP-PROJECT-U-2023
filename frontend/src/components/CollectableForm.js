import React, { useState } from "react";

function CollectiblesForm() {
  const [collectibleData, setCollectibleData] = useState({
    type: "",
    name: "",
    description: "",
    openingValue: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "openingValue" && (parseFloat(value) <= 0 || isNaN(parseFloat(value)))) {
      setCollectibleData({
        ...collectibleData,
        [name]: "",
      });
    } else {
      setCollectibleData({
        ...collectibleData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setCollectibleData({
      ...collectibleData,
      images: files,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here, such as saving the data to a database.
    console.log("Collectible data:", collectibleData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <h2>Add a New Collectible</h2>
      <select class="form-select" aria-label="Default select example" required>
         <option selected disabled>Type</option>
         <option value="1">Furniture</option>
         <option value="1">Antique</option>
         <option value="1">Books</option>
         <option value="1">Jewelry</option>
         <option value="2">Toys</option>
         <option value="3">Other</option>
      </select>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Collectible name"
          value={collectibleData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Collectible description"
          value={collectibleData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="openingValue">Opening Value (Rs):</label>
        <input
          type="text"
          id="openingValue"
          name="openingValue"
          placeholder="e.g., 100"
          value={collectibleData.openingValue}
          onChange={handleChange}
          required
        />

        <label htmlFor="images">Images:</label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
        />

       <div className="row justify-content-center">
          {/* Center the buttons within a row */}
          <div className="col-auto">
            <button type="button" className="btn btn-secondary btn-lg">Back</button>
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-primary btn-lg">Submit</button>
          </div>
        </div>
</form>
    </div>
  );
}

export default CollectiblesForm;
