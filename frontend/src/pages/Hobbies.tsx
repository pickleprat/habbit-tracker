import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Edit, Trash2, PlusCircle, Target } from 'lucide-react';
import Goals from '../components/Goal'; // Import the Goals component
import type { Hobby, Goal } from './types';

// Define the Goal and Period types

const Hobbies: React.FC = () => {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [form, setForm] = useState({ title: '', category: '', description: '' });
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);

  // Simulate fetching hobbies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/hobby/view", {
          method: "GET",
        });
        const data = await res.json();
        setHobbies(data);  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async () => {
    if (!form.title.trim()) return;
    
    const newHobby: Hobby = {
      id: Date.now().toString(),
      title: form.title,
      category: form.category,
      description: form.description,
      createdAt: new Date().toISOString(),
    };

    try {
      // This would be your actual API call
      // const response = await fetch('http://localhost:8080/api/hobby/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newHobby)
      // });
      // const savedHobby = await response.json();
      
      setHobbies(prev => [newHobby, ...prev]);
      setForm({ title: '', category: '', description: '' });
      setSelectedHobby(newHobby); // Set the newly created hobby as selected
    } catch (error) {
      console.error('Error creating hobby:', error);
    }
  };

  const handleEdit = (id: string | undefined) => {
    // open edit modal or inline editing
    console.log('Edit hobby', id);
  };

  const handleDelete = (id: string | undefined) => {
    setHobbies(prev => prev.filter(h => h.id !== id));
    
    // If the deleted hobby was selected, clear selection
    if (selectedHobby && selectedHobby.id === id) {
      setSelectedHobby(null);
    }
  };

  const handleGoalCreated = (goal: Goal) => {
    setGoals(prev => [...prev, goal]);
  };

  // Helper function to count goals for a specific hobby
  const countGoalsForHobby = (hobbyId: string | undefined) => {
    return goals.filter(goal => goal.hobbyId === hobbyId).length;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <Header title="Hobby Tracker" />
      <main className="flex-grow max-w-6xl mx-auto p-6 w-full mb-16">
        <div className="space-y-6">
          {/* Create Hobby Card */}
          <Card className="border-gray-200 shadow-sm w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-green-500" />
                Add a New Hobby
              </CardTitle>
              <CardDescription>Create your next passion project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={form.title} 
                    onChange={handleChange} 
                    placeholder="What's your hobby called?"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    name="category" 
                    value={form.category} 
                    onChange={handleChange} 
                    placeholder="e.g. Art, Fitness, Music"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description" 
                    name="description" 
                    value={form.description} 
                    onChange={handleChange} 
                    placeholder="Tell us about your hobby"
                    className="mt-1"
                  />
                </div>
                <Button 
                  onClick={handleCreate} 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={!form.title.trim()}
                >
                  Create Hobby
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Goal Creation Component - Only shown when a hobby is selected */}
          <Goals selectedHobby={selectedHobby} onGoalCreated={handleGoalCreated} />

          {/* Hobby List Card */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Your Hobbies</CardTitle>
              <CardDescription>Manage and view your hobbies</CardDescription>
            </CardHeader>
            <CardContent>
              {hobbies.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hobbies yet. Create one above!</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {hobbies.map(hobby => (
                    <li
                      key={hobby.id}
                      className={`p-4 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition ${selectedHobby?.id === hobby.id ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-100'}`}
                      onClick={() => setSelectedHobby(hobby)}
                    >
                      <div className="flex justify-between items-start w-full">
                        <div>
                          <h3 className="font-semibold text-lg">{hobby.title}</h3>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full mt-1">
                            {hobby.category}
                          </span>
                          {countGoalsForHobby(hobby.id) > 0 && (
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full mt-1 ml-2">
                              <span className="flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                {countGoalsForHobby(hobby.id)} {countGoalsForHobby(hobby.id) === 1 ? 'Goal' : 'Goals'}
                              </span>
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(hobby.id);
                            }}
                            className="text-gray-500 hover:text-blue-600 h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(hobby.id);
                            }}
                            className="text-gray-500 hover:text-red-600 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {hobby.description && (
                        <p className="mt-2 text-gray-600 text-sm">{hobby.description}</p>
                      )}
                      <div className="mt-2">
                        {hobby.id === selectedHobby?.id ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedHobby(null);
                            }}
                          >
                            Cancel Selection
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedHobby(hobby);
                            }}
                          >
                            Add Goals
                          </Button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default Hobbies;