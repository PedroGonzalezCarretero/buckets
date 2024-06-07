import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { Badge } from "../ui/badge";
import { ColumnId } from "./KanbanBoard";
import { SelectTask } from "@/schema";
import {DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
  import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteTask } from "@/app/api/tasks/actions";

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: string;
}

interface TaskCardProps {
  task: SelectTask;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType; 
  task: SelectTask;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });


  const handleDeleteTask = async (taskId: number) => {
    try {
      console.log(taskId)
      await deleteTask(taskId)

      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="space-between relative flex flex-row border-secondary px-3 py-3">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="-ml-2 h-auto cursor-grab p-1 text-secondary-foreground/50"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
        <p>{task.description}</p>
        <Badge variant={`${task.status === 'done' ? 'default' : 'secondary'}`} className="ml-auto font-semibold">
          {task.status}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="rounded-none">Editar</DropdownMenuItem>
              <Dialog>
    <DialogTrigger className="cursor-pointer hover:bg-accent w-full text-start rounded-full select-none items-center px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Eliminar</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Estas seguro?</DialogTitle>
      
                </DialogHeader>
                
                <DialogDescription>
                  Esta accion no se puede deshacer
                </DialogDescription>

                <Button variant={'destructive'} onClick={() => handleDeleteTask(task.id)}>Delete</Button>
  </DialogContent>
</Dialog> 
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
    </Card>
  );
}
