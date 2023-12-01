/* eslint-disable valid-typeof */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */

import "./ClothsForm.css";
import React, { useEffect, useState } from "react";
import ClothsRow from "../ClothsRow/ClothsRow";


//Get data from localStorage
const getDataFromLocalStorage = ()=> {
  const getData = localStorage.getItem("ClothList")
  return getData ? JSON.parse(getData) : []
}


const ClothsForm = () => {
  const [clothList, setClothList] = useState(getDataFromLocalStorage());

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("White");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("")
  const [date, setDate] = useState("")
  const [isChecked, setIsChecked] = useState(false)


// Set LocalStorage
useEffect(()=> {
  localStorage.setItem("ClothList", JSON.stringify(clothList))
},[clothList])


// Form Handling
  const formHandling = (e) => {
    e.preventDefault();

    if(price <= 0 || quantity <=0) {
      alert(`Price '${price}' or Quantity '${quantity}' less than 1.`)
    }
    else{
  const cloth = {
      name,
      id,
      price, 
      quantity,
      color,
      description,
      size,
      isChecked,
      date
    };

    // Check if cloth with the same ID already exists
    if (clothList.some((existingCloth) => existingCloth.id === id)) {
      alert(`Cloth with ID '${id}' already exists.`);
    } else {
      setClothList([...clothList, cloth]);
      clearInput();
    }
  }

  };


// Clear input filed
  const clearInput = () => {
    setName("");
    setId("");
    setPrice("");
    setQuantity("");
    setColor("");
    setDescription("");
    setSize("")
    setIsChecked(false)
    setDate("")
  };

// Delete Cloth
    const deleteCloth = (clothId) => {
      const clothListFiltered = clothList.filter((value)=> (value.id !== clothId))
      setClothList(clothListFiltered)
    }

// Remove all
  const removeAll = () => {
    setClothList([]);
  };

  return (
    <div>
      <div className="clothContainer">
        <h1 className="clothTitle">Cloth Information</h1>
        <div className="clothForm flex">
          <form onSubmit={formHandling} className="formInfo">
            <div>
              <label htmlFor="name">Cloth Name:</label> <br />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                placeholder="Cloth Name......"
                required
              />
            </div>
            <div>
              <label htmlFor="clothId">Cloth ID:</label> <br />
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                type="text"
                name="clothId"
                placeholder="Cloth ID......"
                required
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label> <br />
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                name="price"
                placeholder="$ Price......"
                required
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity:</label> <br />
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                name="quantity"
                placeholder="Quantity......"
                required
              />
            </div>

            <div>
              <label htmlFor="description">Description:</label> <br />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                cols="20"
                rows="2.5"
                placeholder="Description......"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="">Select Color:</label>
              <select  value={color} onChange={(e) => setColor(e.target.value)} required >
                <option  value="white">White</option>
                <option  value="red">Red</option>
                <option  value="blue">Blue</option>
                <option  value="green">Green</option>
              </select>
            </div>

            <div>
              <label className="radioInfo" htmlFor="size"> Select Size:</label> <br />
              <input checked={size === "M"} onChange={e=> setSize(e.target.value)} type="radio" name="size" value='M' required /> <span>M</span>
              <input checked={size === "L"} onChange={e=> setSize(e.target.value)} type="radio" name="size" value='L' required /> <span>L</span>
              <input checked={size === "XL"} onChange={e=> setSize(e.target.value)} type="radio" name="size" value='XL'required /> <span>XL</span>
              <input checked={size === "XXL"} onChange={e=> setSize(e.target.value)} type="radio" name="size" value='XXL' required/> <span>XXL</span>
            </div>

            <div className="checkboxInfo">
              <label htmlFor="">Are you agree?</label>
              <input type="checkbox" checked={isChecked} onChange={() =>setIsChecked(!isChecked)} required />
            </div>

            <div className="clothAddBtn flex">
              <button>Add Cloth</button>
            </div>
          </form>

          {clothList.length > 0 ? (
            <div className="clothsListTable">
              <div className="clothsTable">
                <table className="tableInfo">
                  <thead>
                    <tr>
                      <th>Cloth Name</th>
                      <th>Cloth Id</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Color</th>
                      <th>Description</th>
                      <th>Size</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clothList.map((value) =>
                      <ClothsRow key={value.id} value={value} deleteItem={deleteCloth} />
                    )}
                  </tbody>
                </table>
              </div>

              <div className="removeAllCloth flex">
                <button onClick={removeAll}>Remove All</button>
              </div>
            </div>
          ) : (
            <p className="noClothADD">No Cloth Added!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClothsForm;
