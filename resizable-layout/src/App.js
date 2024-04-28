import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import axios from 'axios';

import './App.css';

const Layout = () => {
  const [sizes, setSizes] = useState([300, 300, 400]);
  const [totalCount, setTotalCount] = useState(0); // New state for total count
  const [inputValues, setInputValues] = useState({
    component1: '',
    component2: '',
    component3: ''
  });

  const [inputModified, setInputModified] = useState(false); // State to track input modification

  const handleResize = (index, { size }) => {
    const newSizes = [...sizes];
    newSizes[index] = size.width;
    setSizes(newSizes);
  };

  const handleInputChange = (event, componentName) => {
    const { value } = event.target;
    setInputValues(prevState => ({
      ...prevState,
      [componentName]: value
    }));
    setInputModified(true);
  };

  const handleAddData = (index) => {
    const inputValue = inputValues[Object.keys(inputValues)[index]];
    // Check if input value is not empty and input is modified
    if (inputValue.trim() !== '' && inputModified) {
      axios.post('http://localhost:3001/api/add', { [Object.keys(inputValues)[index]]: inputValue })
        .then(response => {
          const { totalCount } = response.data;
          setTotalCount(totalCount);
          setInputModified(false); // Reset input modification flag
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      // If input value is empty or input is not modified, clear the input field
      setInputValues(prevState => ({
        ...prevState,
        [Object.keys(inputValues)[index]]: ''
      }));
    }
  };
   

  const handleUpdateData = (index) => {
    const inputValue = inputValues[Object.keys(inputValues)[index]];
    // Check if input value is not empty
    if (inputValue.trim() !== '') {
      axios.post('http://localhost:3001/api/update', { [Object.keys(inputValues)[index]]: inputValue })
        .then(response => {
          const { totalCount } = response.data;
          setTotalCount(totalCount);
          // Update the input field with the edited data
          setInputValues(prevState => ({
            ...prevState,
            [Object.keys(inputValues)[index]]: inputValue
          }));
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      // If input value is empty, do nothing
      console.log('Input value is empty');
    }
  };
  

  return (
    <div className="container">
      <div className="flex-container">
        <Resizable
          width={sizes[0]}
          height={Infinity}
          onResize={(e, data) => handleResize(0, data)}
        >
          <div className="resizable-component">
            <h1>Component 1</h1>
            <div className="input-container">
              <input
                type="text"
                value={inputValues.component1}
                onChange={(e) => handleInputChange(e, 'component1')}
              />
            </div>
            <div className="button-container">
              <button className='button1' onClick={() => handleAddData(0)}>Add</button>
              <button className='button2' onClick={() => handleUpdateData(0)}>Update</button>
            </div>
          </div>
        </Resizable>
        <Resizable
          width={sizes[1]}
          height={Infinity}
          onResize={(e, data) => handleResize(1, data)}
        >
          <div className="resizable-component">
            <h1>Component 2</h1>
            <div className="input-container">
              <input
                type="text"
                value={inputValues.component2}
                onChange={(e) => handleInputChange(e, 'component2')}
              />
            </div>
            <div className="button-container">
              <button className='button1' onClick={() => handleAddData(1)}>Add</button>
              <button className='button2' onClick={() => handleUpdateData(1)}>Update</button>
            </div>
          </div>
        </Resizable>
      </div>
      <Resizable
        width={sizes[2]}
        height={Infinity}
        onResize={(e, data) => handleResize(2, data)}
      >
        <div className="resizable-component">
          <h1>Component 3</h1>
          <div className="input-container">
            <input
              type="text"
              value={inputValues.component3}
              onChange={(e) => handleInputChange(e, 'component3')}
            />
          </div>
          <div className="button-container">
            <button className='button1' onClick={() => handleAddData(2)}>Add</button>
            <button className='button2' onClick={() => handleUpdateData(2)}>Update</button>
          </div>
        </div>
      </Resizable>
      <div className="button-container">
        <p>Total Count: {totalCount}</p>
      </div>
    </div>
  );
};

export default Layout;
