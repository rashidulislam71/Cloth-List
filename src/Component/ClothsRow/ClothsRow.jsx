/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { MdDeleteForever } from "react-icons/md";
import "./ClothsRow.css"

const ClothsRow = ({ value, deleteItem }) => {
  const { name, id, price, quantity, color, description, size,date } = value;
  return (
    <tr>
      <td>{name}</td>
      <td>{id}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>{color}</td>
      <td>{description}</td>
      <td>{size}</td>
      <td >
        <button className="deleteBtn" onClick={() => deleteItem(id)}><MdDeleteForever /></button>
        
      </td>
    </tr>
  );
};

export default ClothsRow;
