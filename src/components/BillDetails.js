import React, { useState } from "react";

const BillDetails = ({ onAddItem }) => {
	  const [item, setItem] = useState("");
	  const [quantity, setQuantity] = useState(1);
	  const [price, setPrice] = useState(0);

	  const handleAddItem = () => {
		// Log the values of item, quantity, and price before adding the item
		console.log("Item:", item);
		console.log("Quantity:", quantity);
		console.log("Price:", price);

		// Ensure quantity and price are valid numbers
		const parsedQuantity = parseInt(quantity);
		      const parsedPrice = parseFloat(price);

		      if (item && parsedQuantity > 0 && !isNaN(parsedPrice) && parsedPrice > 0) {
			 console.log("Adding item...");
			 // If the input is valid, add the item
			 onAddItem({ item, quantity: parsedQuantity, price: parsedPrice });
			            setItem("");
			            setQuantity(1);
			            setPrice(0);
			} else {
			  // Optionally show an error message if the input is invalid
			  alert("Please enter valid item details (positive numbers for quantity and price).");
				    }
		    };

	  return (
		      <div>
		        <label>Item:</label>
		        <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
		        <label>Quantity:</label>
		        <input
		          type="number"
		          value={quantity}
		          onChange={(e) => setQuantity(e.target.value)}
		          min="1"
		        />
		        <label>Price (R):</label>
		        <input
		          type="number"
		          value={price}
		          onChange={(e) => setPrice(e.target.value)}
		          min="0"
		        />
		        <button onClick={handleAddItem}>Add Item</button>
		      </div>
		    );
};

export default BillDetails;
