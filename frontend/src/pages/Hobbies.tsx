import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Edit, Trash2, PlusCircle, Target, Check, X, Lightbulb } from 'lucide-react';
import type { Hobby, Goal } from './types';

const GoalFirstFlow: React.FC = () => {
  // Step tracking for the flow
  const [flowStep, setFlowStep] = useState<'goal-creation' | 'hobby-suggestion' | 'hobby-creation'>('goal-creation');
  
  // States for Goal
  const [goalForm, setGoalForm] = useState<Goal>({
    objective: '',
    unit: 'WEEKLY',
    steps: 1
  });
  
  // Current goal being created
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
  
  // Suggested hobbies from MCP server (to be filled by API)
  const [suggestedHobbies, setSuggestedHobbies] = useState<Hobby[]>([]);
  
  // State to track if user wants to create a new hobby instead
  const [createNewHobby, setCreateNewHobby] = useState(false);
  
  // States for Hobby creation
  const [hobbyForm, setHobbyForm] = useState<Hobby>({
    title: '',
    category: '',
    description: ''
  });
  
  // States for tracking collections
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);
  const [statusMessage, setStatusMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Handle goal form changes
  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === 'steps' 
      ? parseInt(e.target.value) || 0
      : e.target.value;
    
    setGoalForm(prev => ({ ...prev, [e.target.name]: value }));
  };

  // Handle unit change in select component
  const handleUnitChange = (value: string) => {
    setGoalForm(prev => ({ ...prev, unit: value }));
  };

  // Handle hobby form changes
  const handleHobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHobbyForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

   // Save goal and move to hobby suggestion
  const handleGoalCreation = () => {
    if (!goalForm.objective.trim()) return;
    
    const newGoal: Goal = {
      objective: goalForm.objective,
      unit: goalForm.unit,
      steps: goalForm.steps,
    };
    
    // Store the goal temporarily (not in DB yet)
    setCurrentGoal(newGoal);

    const filterHobbies = async() => {
      try {
        const res = await fetch("http://localhost:8080/api/hobby/view", {
          method: 'GET', 
        })

        if(!res.ok) {
          console.log("Could not fetch data"); 
        } 

        const hobbies = await res.json(); 
        setSuggestedHobbies(hobbies);
      } catch(error)  {
          console.log("Failed to get hobbies"); 
          console.log(error); 
      }  
    }  

    filterHobbies(); 
    setFlowStep('hobby-suggestion');
  };

  // Select a suggested hobby
  const handleSelectSuggestedHobby = (hobby: Hobby) => {
    if (!currentGoal) return;
    
    // Add hobby to collection
    setHobbies(prev => [...prev, hobby]);
    
    // Complete the goal with the selected hobby
    const finalGoal: Goal = {
      ...currentGoal,
      hobbyId: hobby.id
    };
    
    // Add goal to collection
    setGoals(prev => [...prev, finalGoal]);
    
    // Reset the flow
    resetFlow();
    
    // Set the selected hobby
    setSelectedHobby(hobby);
  };

  // Create a new hobby instead of using suggestions
  const handleCreateNewHobby = () => {
    setCreateNewHobby(true);
    setFlowStep('hobby-creation');
  };

  // Complete hobby creation
  const handleHobbyCreation = () => {
    if (!hobbyForm.title.trim() || !currentGoal) return;
    
    const newHobby: Hobby = {
      id: Date.now().toString(),
      title: hobbyForm.title,
      category: hobbyForm.category,
      description: hobbyForm.description,
      createdAt: new Date().toISOString()
    };
    
    // Add hobby to collection
    setHobbies(prev => [...prev, newHobby]);
    
    // Complete the goal with the new hobby
    const finalGoal: Goal = {
      ...currentGoal,
      hobbyId: newHobby.id
    };
    
    // Add goal to collection
    setGoals(prev => [...prev, finalGoal]);
    
    // Reset the flow
    resetFlow();
    
    // Set the selected hobby
    setSelectedHobby(newHobby);
  };

  // Reset the flow
  const resetFlow = () => {
    setFlowStep('goal-creation');
    setCurrentGoal(null);
    setCreateNewHobby(false);
    setGoalForm({
      objective: '',
      unit: 'WEEKLY',
      steps: 1
    });
    setHobbyForm({
      title: '',
      category: '',
      description: ''
    });
    setStatusMessage(null);
  };

  // Cancel the flow
  const handleCancel = () => {
    resetFlow();
  };

  // Handle editing a hobby
  const handleEdit = (id: string | undefined) => {
    console.log('Edit hobby', id);
    // Implement edit functionality
  };

  // Handle deleting a hobby
  const handleDelete = (id: string | undefined) => {
    setHobbies(prev => prev.filter(h => h.id !== id));
    
    // If the deleted hobby was selected, clear selection
    if (selectedHobby && selectedHobby.id === id) {
      setSelectedHobby(null);
    }
  };

  // Handle saving both hobby and goal to database
  const handleSaveToDatabase = async () => {
    if (!selectedHobby || !goals.find(g => g.hobbyId === selectedHobby.id)) return;
    
    try {
      setStatusMessage({ type: 'success', text: 'Successfully saved your hobby and goal!' });
      
      // Here you would implement your API calls to save the data
      // Example:
      // await saveHobbyToDb(selectedHobby);
      // await saveGoalToDb(goals.find(g => g.hobbyId === selectedHobby.id));
      
      // Clear selection after successful save
      setTimeout(() => {
        setStatusMessage(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error saving to database:', error);
      setStatusMessage({ type: 'error', text: 'Failed to save. Please try again.' });
      
      setTimeout(() => {
        setStatusMessage(null);
      }, 5000);
    }
  };

  // Helper function to count goals for a specific hobby
  const countGoalsForHobby = (hobbyId: string | undefined) => {
    return goals.filter(goal => goal.hobbyId === hobbyId).length;
  };
    return (<div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <Header title="Hobby Tracker" />
      <main className="flex-grow max-w-6xl mx-auto p-6 w-full mb-16">
        <div className="space-y-6">
          {/* Status Message */}
          {statusMessage && (
            <div className={`p-4 rounded-md mb-4 ${
              statusMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 
              'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {statusMessage.type === 'success' ? (
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  {statusMessage.text}
                </div>
              ) : (
                <div className="flex items-center">
                  <X className="w-5 h-5 mr-2" />
                  {statusMessage.text}
                </div>
              )}
            </div>
          )}

          {/* Goal First Flow Card */}
          <Card className="border-gray-200 shadow-sm w-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Set a New Goal
              </CardTitle>
              <CardDescription>
                {flowStep === 'goal-creation' && "Let's start by defining what you want to achieve"}
                {flowStep === 'hobby-suggestion' && "Choose a hobby that can help you achieve your goal"}
                {flowStep === 'hobby-creation' && "Create a new hobby for your goal"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Goal Creation Step */}
              {flowStep === 'goal-creation' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="objective">What would you like to accomplish?</Label>
                    <Input 
                      id="objective" 
                      name="objective" 
                      value={goalForm.objective} 
                      onChange={handleGoalChange} 
                      placeholder="e.g., Run 5km, Learn to play guitar, Read more books"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="unit">How often do you want to work on this?</Label>
                    <Select 
                      value={goalForm.unit} 
                      onValueChange={handleUnitChange}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DAY">Daily</SelectItem>
                        <SelectItem value="WEEK">Weekly</SelectItem>
                        <SelectItem value="MONTH">Monthly</SelectItem>
                        <SelectItem value="YEAR">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="steps">How many milestones do you want to set?</Label>
                    <Input 
                      id="steps" 
                      name="steps" 
                      type="number"
                      min="1"
                      value={goalForm.steps} 
                      onChange={handleGoalChange} 
                      placeholder="Number of steps to complete this goal"
                      className="mt-1"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleGoalCreation} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!goalForm.objective.trim()}
                  >
                    Continue
                  </Button>
                </div>
              )}
              
              {/* Hobby Suggestion Step */}
              {flowStep === 'hobby-suggestion' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Your Goal:</h3>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="font-medium">{currentGoal?.objective}</p>
                      <p className="text-sm text-gray-600">{goalForm.unit.toLowerCase()} goal with {goalForm.steps} milestone{goalForm.steps > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-500" />
                      Suggested Hobbies:
                    </h3>
                    <ul className="space-y-3">
                      {suggestedHobbies.map(hobby => (
                        <li
                          key={hobby.id}
                          className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{hobby.title}</h4>
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full mt-1">
                                {hobby.category}
                              </span>
                              <p className="mt-2 text-sm text-gray-600">{hobby.description}</p>
                            </div>
                            <Button
                              onClick={() => handleSelectSuggestedHobby(hobby)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Select
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2 flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateNewHobby}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <PlusCircle className="w-4 h-4 mr-1" />
                      Create New Hobby
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Hobby Creation Step */}
              {flowStep === 'hobby-creation' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Your Goal:</h3>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="font-medium">{currentGoal?.objective}</p>
                      <p className="text-sm text-gray-600">{goalForm.unit.toLowerCase()} goal with {goalForm.steps} milestone{goalForm.steps > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="title">Hobby Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={hobbyForm.title} 
                      onChange={handleHobbyChange} 
                      placeholder="What's your hobby called?"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input 
                      id="category" 
                      name="category" 
                      value={hobbyForm.category} 
                      onChange={handleHobbyChange} 
                      placeholder="e.g. Art, Fitness, Music"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input 
                      id="description" 
                      name="description" 
                      value={hobbyForm.description} 
                      onChange={handleHobbyChange} 
                      placeholder="Tell us about your hobby"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="pt-2 flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setFlowStep('hobby-suggestion')}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleHobbyCreation} 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      disabled={!hobbyForm.title.trim()}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Create Hobby
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hobby List Card */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Your Hobbies</CardTitle>
              <CardDescription>Manage and view your hobbies</CardDescription>
            </CardHeader>
            <CardContent>
              {hobbies.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No hobbies yet. Create a goal above to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
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
                      </li>
                    ))}
                  </ul>
                  
                  {/* Save to Database Button */}
                  {selectedHobby && (
                    <Button 
                      onClick={handleSaveToDatabase} 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Save Hobby and Goal to Database
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default GoalFirstFlow;