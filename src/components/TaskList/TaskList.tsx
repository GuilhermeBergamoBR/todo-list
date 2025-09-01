// TaskList.tsx
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { JSX } from "react";

type TaskListProps<T> = {
  items: T[];
  setItems: (newItems: T[]) => void;
  children: (item: T) => JSX.Element; // conteúdo arbitrário (sua Task)
  getId: (item: T) => string | number;
};

export function TaskList<T>({
  items,
  setItems,
  children,
  getId,
}: TaskListProps<T>) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => getId(i) === active.id);
    const newIndex = items.findIndex((i) => getId(i) === over.id);
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(getId)}
        strategy={verticalListSortingStrategy}
      >
        <div className="max-h-96 overflow-y-auto">
          {items.map((item) => (
            <SortableItem key={getId(item)} id={getId(item)}>
              {children(item)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({
  id,
  children,
}: {
  id: string | number;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* ALÇA DE ARRASTE: só aqui vai os listeners */}
      <button
        ref={setActivatorNodeRef}
        {...listeners}
        aria-label="Reordenar"
        className="cursor-grab select-none bg-transparent border-none"
      >
        ≡
      </button>
      {children}
    </div>
  );
}
