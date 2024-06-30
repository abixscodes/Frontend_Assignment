import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/dndTypes';

const Row = ({ state, index, moveRow, removeState, variants }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.ROW,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ROW,
    item: { type: ItemTypes.ROW, id: state.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <tr ref={ref} className="border-b hover:bg-gray-100 transition-all duration-200" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <td className="py-2">{state.name}
        <button onClick={() => removeState(state.id)} className="bg-red-500 text-white ml-2 p-1">X</button>
      </td>
      {variants.map((variant, i) => (
        <td key={i} className="py-2">
          {}
        </td>
      ))}
    </tr>
  );
};

export default Row;
