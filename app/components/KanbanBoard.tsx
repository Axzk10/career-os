import {
  DndContext,
  PointerSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import KanbanColumn from "./KanbanColumn";
import type { Job } from "../types";

type KanbanBoardProps = {
  jobs: Job[];
  columns: string[];
  onDragEnd: (event: DragEndEvent) => void;
};

export default function KanbanBoard({
  jobs,
  columns,
  onDragEnd,
}: KanbanBoardProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <section
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          paddingBottom: 8,
        }}
      >
        {columns.map((column) => {
          const columnJobs = jobs.filter(
            (job) => job.status === column
          );

          return (
            <KanbanColumn
              key={column}
              title={column}
              jobs={columnJobs}
            />
          );
        })}
      </section>
    </DndContext>
  );
}
