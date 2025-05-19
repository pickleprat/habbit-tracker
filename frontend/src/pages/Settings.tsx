import React from 'react';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '../components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useForm } from 'react-hook-form';
import { User, ShieldCheck, Moon, Bell, Trash2 } from 'lucide-react';

interface SettingsFormValues {
  email: string;
  newPassword: string;
  notifications: boolean;
  darkMode: boolean;
}

const Settings: React.FC = () => {
  const form = useForm<SettingsFormValues>({
    defaultValues: {
      email: 'hinata.uzumaki@gmail.com',
      newPassword: '',
      notifications: true,
      darkMode: false,
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    console.log('Updated settings:', data);
    // TODO: Call backend API to update user settings
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <Header title="Hobby Tracker" />

      <main className="flex-grow max-w-4xl mx-auto p-6 w-full mb-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your preferences and account security</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Profile Info */}
            <Card>
              <CardHeader className="flex items-center space-x-2">
                <User className="text-green-600" />
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your basic profile details</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} className="focus:border-green-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader className="flex items-center space-x-2">
                <ShieldCheck className="text-green-600" />
                <div>
                  <CardTitle>Password & Security</CardTitle>
                  <CardDescription>Change your password securely</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} placeholder="••••••••" className="focus:border-green-500" />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader className="flex items-center space-x-2">
                <Bell className="text-green-600" />
                <div>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Set app preferences</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="notifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel>Enable Notifications</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="darkMode"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel>Dark Mode</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card>
              <CardHeader className="flex items-center space-x-2">
                <Trash2 className="text-red-600" />
                <div>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>Delete your account permanently</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => alert('Account deletion initiated')}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>

            {/* Save Settings */}
            <div className="flex justify-end">
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </main>

      <Navbar />
    </div>
  );
};

export default Settings;
