import React, { useState } from 'react';
import Row from './Row'; 
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid'; 
import { initialStates, initialVariants } from '../constants/initialData';

const Table = () => {
  const [states, setStates] = useState(initialStates);
  const [variants, setVariants] = useState(initialVariants);

  const addState = () => {
    const newState = { id: uuidv4(), name: `State ${states.length + 1}` };
    setStates([...states, newState]);
  };

  const removeState = (id) => {
    setStates(states.filter((state) => state.id !== id));
  };

  const addVariant = () => {
    setVariants([...variants, `Variant ${variants.length + 1}`]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRow = states[dragIndex];
    const newStates = [...states];
    newStates.splice(dragIndex, 1);
    newStates.splice(hoverIndex, 0, dragRow);
    setStates(newStates);
  };

 
  const handleImageUpload = (file, variantIndex) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const newStates = states.map((state) => {
        if (state.images === undefined) {
          state.images = [];
        }

        const updatedImages = [...state.images];
        updatedImages[variantIndex] = { url: reader.result, file };
        return { ...state, images: updatedImages };
      });

      setStates(newStates);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <button onClick={addState} className="bg-blue-500 text-white p-2 m-2">
          Add State
        </button>
        <button onClick={addVariant} className="bg-green-500 text-white p-2 m-2">
          Add Variant
        </button>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">State</th>
              {variants.map((variant, index) => (
                <th key={index} className="py-2">
                  {variant}
                  <button
                    onClick={() => removeVariant(index)}
                    className="bg-red-500 text-white ml-2 p-1"
                  >
                    X
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {states.map((state, index) => (
              <Row
                key={state.id}
                state={state}
                index={index}
                moveRow={moveRow}
                removeState={removeState}
                variants={variants}
                handleImageUpload={handleImageUpload}
              />
            ))}
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
};

export default Table;
