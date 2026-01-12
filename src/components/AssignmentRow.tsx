import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export interface Assignment {
  id: number;
  name: string;
  weight: number | string;
  score: number | string;
}

interface AssignmentRowProps {
  data: Assignment;
  onUpdate: (id: number, field: keyof Assignment, value: string | number) => void;
  onDelete: (id: number) => void;
}

export function AssignmentRow({ data, onUpdate, onDelete }: AssignmentRowProps) {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex-1">
        <Input
          placeholder="Assignment Name"
          value={data.name}
          onChange={(e) => onUpdate(data.id, "name", e.target.value)}
          className="bg-card"
        />
      </div>
      <div className="w-24">
        <Input
          type="number"
          placeholder="Weight"
          value={data.weight}
          onChange={(e) => onUpdate(data.id, "weight", e.target.value)}
          className="bg-card"
        />
      </div>
      <div className="w-24">
        <Input
          type="number"
          placeholder="Score"
          value={data.score}
          onChange={(e) => onUpdate(data.id, "score", e.target.value)}
          className="bg-card"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(data.id)}
        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
