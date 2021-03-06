import { DndContext } from '@dnd-kit/core';
import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import DraggableColorbox from './DraggableColorbox';
import { useGlobalContext } from '../contexts/GlobalContext';

function DndComponent() {
  const { colors, setColors } = useGlobalContext();

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 200ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColors((colors) => {
        // const oldIndex = colors.indexOf(active.id);
        // const newIndex = colors.indexOf(over.id);
        const oldIndex = colors.findIndex((item) => item.id === active.id);
        const newIndex = colors.findIndex((item) => item.id === over.id);

        return arrayMove(colors, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={colors}>
        {colors.map((color) => (
          <DraggableColorbox
            color={color.color}
            name={color.name}
            key={color.id}
            id={color.id}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}

export default DndComponent;
