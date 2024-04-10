import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableElement = () => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ELEMENT', // The type that identifies the draggable
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
      }}
    >
      Drag me
    </div>
  );
};

export default DraggableElement;
