import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Target } from 'lucide-react';
import type { Hobby , Goal, Period  } from '../pages/types';


type GoalsProps = {
  selectedHobby: Hobby | null;
  onGoalCreated: (goal: Goal) => void;
};

const Goals: React.FC<GoalsProps> = ({ selectedHobby, onGoalCreated }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [form, setForm] = useState<Goal>({
    objective: '',
    unit: 'WEEK',
    steps: 1
  });

  // Reset form when selected hobby changes
  useEffect(() => {
    setForm({
      objective: '',
      unit: 'WEEK',
      steps: 1
    });
  }, [selectedHobby]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === 'steps' 
      ? parseInt(e.target.value) || 0
      : e.target.value;
    
    setForm(prev => ({ ...prev, [e.target.name]: value }));
  };

  const handleUnitChange = (value: Period) => {
    setForm(prev => ({ ...prev, unit: value }));
  };

  const handleCreate = async () => {
    if (!form.objective.trim() || !selectedHobby) return;
    
    const newGoal: Goal = {
      id: Date.now().toString(),
      objective: form.objective,
      unit: form.unit,
      steps: form.steps,
      hobbyId: selectedHobby.id
    };

    try {
      // This would be replaced with an actual API call
      // const response = await fetch('http://localhost:8080/api/goal/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newGoal)
      // });
      // const savedGoal = await response.json();
      
      setGoals(prev => [newGoal, ...prev]);
      onGoalCreated(newGoal);
      
      // Reset form
      setForm({
        objective: '',
        unit: 'WEEK',
        steps: 1
      });
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  // If no hobby is selected, don't render the component
  if (!selectedHobby) {
    return null;
  }

  return (
    <Card className="border-gray-200 shadow-sm w-full mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          Add a Goal for {selectedHobby.title}
        </CardTitle>
        <CardDescription>Set objectives to track your progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="objective">Objective</Label>
            <Input 
              id="objective" 
              name="objective" 
              value={form.objective} 
              onChange={handleChange} 
              placeholder="What do you want to achieve?"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="unit">Time Period</Label>
            <Select 
              value={form.unit} 
              onValueChange={(value: Period) => handleUnitChange(value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="WEEKLY">Weekly</SelectItem>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
                <SelectItem value="YEARLY">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="steps">Steps/Milestones</Label>
            <Input 
              id="steps" 
              name="steps" 
              type="number"
              min="1"
              value={form.steps} 
              onChange={handleChange} 
              placeholder="How many steps to complete this goal?"
              className="mt-1"
            />
          </div>
          
          <Button 
            onClick={handleCreate} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!form.objective.trim()}
          >
            Create Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Goals;