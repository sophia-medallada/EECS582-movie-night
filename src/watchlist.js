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
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new item"
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item} 
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DynamicList;