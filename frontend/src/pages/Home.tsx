
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Calendar, Clock, BarChart2, ArrowRight } from 'lucide-react';

// Define hobby type
interface Hobby {
  id: string;
  title: string;
  category: string;
  description: string;
  lastActive?: string;
  sessions?: number;
}

// Define user type
interface User {
  name: string;
  hobbiesCount: number;
  joinDate: string;
}

const Home: React.FC = () => {
  // Mock data for user
  const [user, setUser] = useState<User>({
    name: 'Alex Johnson',
    hobbiesCount: 5,
    joinDate: '2025-03-15'
  });

  // Mock data for recent hobbies
  const [recentHobbies, setRecentHobbies] = useState<Hobby[]>([
    {
      id: '1',
      title: 'Photography',
      category: 'Art',
      description: 'Capturing moments',
      lastActive: '2025-05-18',
      sessions: 12
    },
    {
      id: '2',
      title: 'Running',
      category: 'Fitness',
      description: 'Morning marathons',
      lastActive: '2025-05-15',
      sessions: 24
    },
    {
      id: '3',
      title: 'Guitar',
      category: 'Music',
      description: 'Learning new songs',
      lastActive: '2025-05-17',
      sessions: 8
    }
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <Header title="Hobby Tracker" />
      
      <main className="flex-grow max-w-5xl mx-auto p-6 w-full mb-16">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Track and manage your hobbies all in one place.</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Hobbies</p>
                <p className="text-2xl font-bold">{user.hobbiesCount}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Activity</p>
                <p className="text-2xl font-bold">Yesterday</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <BarChart2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Streak</p>
                <p className="text-2xl font-bold">5 days</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentHobbies.map((hobby) => (
                <div key={hobby.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium">{hobby.title}</h3>
                    <p className="text-sm text-gray-500">{hobby.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Last active: {hobby.lastActive}</p>
                    <p className="text-sm text-gray-500">{hobby.sessions} sessions</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">Add New Hobby</h3>
              <p className="text-sm text-gray-500 mb-4">Start tracking a new interest or activity</p>
              <Button variant="outline" className="w-full">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">View All Hobbies</h3>
              <p className="text-sm text-gray-500 mb-4">Browse and manage your collection</p>
              <Button variant="outline" className="w-full">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default Home; 