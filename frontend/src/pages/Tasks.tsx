import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '../components/ui/card';
import {
  Form,
} from '../components/ui/form';
import { List, CheckCircle  } from 'lucide-react';
import type { Hobby, Goal, Task, Period } from './types';

interface GoalFormValues {
  objective: string;
  unit: Period;
  steps: number;
}

interface TaskFormValues {
  taskName: string;
  description: string;
  duration: Period;
  repetition: number;
}

const periodOptions: Period[] = ['Hour', 'Day', 'Week', 'Month', 'Year'];

const TaskPage: React.FC = () => {
  const { hobbyId } = useParams<{ hobbyId: string }>();
  const [hobby, setHobby] = useState<Hobby | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const goalForm = useForm<GoalFormValues>({ defaultValues: { objective: '', unit: 'Day', steps: 1 } });
  const taskForm = useForm<TaskFormValues>({ defaultValues: { taskName: '', description: '', duration: 'Hour', repetition: 1 } });

  useEffect(() => {
    // TODO: fetch hobby by hobbyId
    // Example:
    // fetch(`/api/hobbies/${hobbyId}`).then(res=>res.json()).then(setHobby);
    setHobby({ id: hobbyId!, title: 'Loading...', category: '', description: '' } as any);
  }, [hobbyId]);

  useEffect(() => {
    if (hobby) {
      // TODO: fetch goals by hobby.id
      setGoals([]);
    }
  }, [hobby]);

  useEffect(() => {
    if (selectedGoal) {
      // TODO: fetch tasks by selectedGoal.id
      setTasks([]);
    }
  }, [selectedGoal]);

  const onCreateGoal = (data: GoalFormValues) => {
    if (!hobby) return;
    const newGoal: Goal = {
      id: Date.now().toString() as any,
      objective: data.objective,
      unit: data.unit,
      steps: data.steps,
      created_at: new Date().toISOString() as any,
      updated_at: new Date().toISOString() as any,
      user: {} as any,
      hobby,
    } as any;
    setGoals(prev => [newGoal, ...prev]);
    goalForm.reset();
  };

  const onCreateTask = (data: TaskFormValues) => {
    if (!selectedGoal) return;
    const newTask: Task = {
      id: Date.now().toString() as any,
      taskName: data.taskName,
      description: data.description,
      duration: data.duration,
      repetition: data.repetition,
      created_at: new Date().toISOString() as any,
      updated_at: new Date().toISOString() as any,
      goal: selectedGoal,
    } as any;
    setTasks(prev => [newTask, ...prev]);
    taskForm.reset();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <Header title={hobby ? `Tasks for ${hobby.title}` : 'Loading...'} />
      <main className="flex-grow max-w-4xl mx-auto p-6 w-full mb-16 space-y-8">
        {/* Goals Section */}
        <Card>
          <CardHeader className="flex items-center space-x-2">
            <List className="text-green-600" />
            <div>
              <CardTitle>Goals</CardTitle>
              <CardDescription>Define your goals for this hobby</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...goalForm}>
              <form onSubmit={goalForm.handleSubmit(onCreateGoal)} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* form fields */}
              </form>
            </Form>
            {/* list goals */}
          </CardContent>
        </Card>

        {/* Tasks Section */}
        {selectedGoal && (
          <Card>
            <CardHeader className="flex items-center space-x-2">
              <CheckCircle className="text-green-600" />
              <div>
                <CardTitle>Tasks for “{selectedGoal.objective}”</CardTitle>
                <CardDescription>Create and track small tasks</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...taskForm}>
                <form onSubmit={taskForm.handleSubmit(onCreateTask)} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {/* task fields */}
                </form>
              </Form>
              {/* list tasks */}
            </CardContent>
          </Card>
        )}
      </main>
      <Navbar />
    </div>
  );
};

export default TaskPage;
