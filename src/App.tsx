import { useState, useMemo } from 'react'
import { Card } from './components/ui/card'
import { Label } from './components/ui/label'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { AssignmentRow, type Assignment } from './components/AssignmentRow'
import { ThemeProvider } from "./components/theme-provider"
import { ModeToggle } from "./components/mode-toggle"
import './App.css'

export default function App() {
  const [target, setTarget] = useState<number | string>(90);
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, name: "Midterm", weight: 20, score: 80 }
  ]);

  const addAssignment = () => {
    setAssignments([
      ...assignments,
      { id: Date.now(), name: "", weight: "", score: "" }
    ]);
  };

  const updateAssignment = (id: number, field: keyof Assignment, value: string | number) => {
    setAssignments(assignments.map(a =>
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const deleteAssignment = (id: number) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const calculation = useMemo(() => {
    const totalWeightUsed = assignments.reduce((sum, a) => sum + Number(a.weight), 0);
    const currentPoints = assignments.reduce((sum, a) => sum + (Number(a.score) * (Number(a.weight) / 100)), 0);

    const finalWeight = 100 - totalWeightUsed;

    const targetNum = Number(target);
    const needed = finalWeight > 0
      ? (targetNum - currentPoints) / (finalWeight / 100)
      : 0;

    return {
      needed: needed.toFixed(1),
      finalWeight: finalWeight.toFixed(1),
      isPossible: needed <= 100,
      isAlreadyMet: needed <= 0
    };
  }, [assignments, target]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground p-4 pb-40 transition-colors duration-300 relative">
        {/* Header & Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>

        <div className="max-w-2xl mx-auto space-y-8 relative">

          {/* TOP SECTION: The Goal */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl border-2 border-primary/10 bg-card shadow-sm mt-4">
            <Label className="text-lg font-medium whitespace-nowrap">Target Grade</Label>
            <div className="relative w-32">
              <Input
                type="number"
                className="text-2xl font-bold text-right pr-8"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">%</span>
            </div>
          </div>

          {/* MIDDLE SECTION: Assignments */}
          <div className="space-y-4">
            <div className="flex justify-between items-end px-2">
              <h3 className="font-semibold text-lg">Assignments</h3>
              <span className="text-sm text-muted-foreground">
                Total Weight: <span className={Number(calculation.finalWeight) < 0 ? "text-destructive font-bold" : ""}>
                  {(100 - Number(calculation.finalWeight)).toFixed(1)}%
                </span>
              </span>
            </div>

            {/* Header Row */}
            <div className="flex gap-2 px-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="flex-1 pl-3">Name</div>
              <div className="w-24 pl-3">Weight (%)</div>
              <div className="w-24 pl-3">Score (%)</div>
              <div className="w-10"></div>{/* Spacer for delete button */}
            </div>

            <div className="space-y-2">
              {assignments.map((asm) => (
                <AssignmentRow
                  key={asm.id}
                  data={asm}
                  onUpdate={updateAssignment}
                  onDelete={deleteAssignment}
                />
              ))}
            </div>

            <Button variant="outline" className="w-full py-6 border-dashed" onClick={addAssignment}>
              + Add Assignment
            </Button>
          </div>
        </div>

        {/* BOTTOM SECTION: Persistent Result Box */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-xl border-t z-10">
          <div className="max-w-2xl mx-auto">
            <Card className={`p-6 shadow-2xl transition-colors duration-500 ${Number(calculation.needed) > 100 ? 'bg-destructive text-destructive-foreground' :
              Number(calculation.needed) <= 0 ? 'bg-green-600 text-white' :
                'bg-primary text-primary-foreground'
              }`}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    {Number(calculation.needed) <= 0 ? "You're safe!" :
                      Number(calculation.needed) > 100 ? "Impossible..." :
                        `${calculation.needed}% Needed`
                    }
                  </h2>
                  <p className="opacity-90">
                    {Number(calculation.finalWeight) <= 0 ? "Check your weights (Total > 100%)" : `On your final (${calculation.finalWeight}% weight)`}
                  </p>
                </div>
                <div className="text-4xl">
                  {Number(calculation.needed) <= 0 ? "🎉" :
                    Number(calculation.needed) > 100 ? "💀" :
                      "🎯"
                  }
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}