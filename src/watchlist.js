// Authors: Sophia, Eli, Damian, Matthew and Abraham
// Date: 2/16/25
// Last Modified: 2/16/25
// Purpose: dynamic list where users can add and remove items
import React, { useState } from 'react';

function DynamicList() {
  const [items, setItems] = useState([]); // State for list items
  const [inputValue, setInputValue] = useState(''); // State for input value

  // Function to handle adding a new item
  const addItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  // Function to handle deleting an item
  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Dynamic List</h1>
      {/* adds new items */}
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new item"
      />
      {/* button to add item to the list */}
      <button onClick={addItem}>Add</button>

      {/* displays the list of items*/}
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item} 
            {/* button to delete the item*/}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DynamicList;
