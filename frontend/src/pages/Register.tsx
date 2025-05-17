// src/pages/RegisterPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { User as UserIcon, Lock, Phone } from 'lucide-react';

interface RegisterFormValues {
  userName: string;
  password: string;
  zipCode: string;
  countryCode: string;
  phoneNumber: string;
  city: string;
  address: string;
  firstName: string;
  lastName: string;
  middleName?: string;
}

const RegisterPage: React.FC = () => {
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      userName: '',
      password: '',
      zipCode: '',
      countryCode: '',
      phoneNumber: '',
      city: '',
      address: '',
      firstName: '',
      lastName: '',
      middleName: '',
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log('Registration data:', data);
    // TODO: call API to register user
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Hobby Tracker" />

      <main className="flex-grow flex items-start justify-center p-6 pb-24">
        <Card className="w-full max-w-8xl mx-auto">
          {/* Personal Information */}
          <CardHeader>
            <div className="flex items-center space-x-2">
              <UserIcon className="w-6 h-6 text-green-500" />
              <CardTitle className="text-2xl">Personal Information</CardTitle>
            </div>
            <CardDescription>Tell us a little about yourself</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Personal Info Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name (optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="A." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Doe" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="johndoe123" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Security */}
                <div className="mt-8 pt-6 border-t">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-medium">Security</h3>
                  </div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="••••••••"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Information */}
                <div className="mt-8 pt-6 border-t">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-medium">
                      Contact Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="123 Main St" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="New York" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="10001" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="countryCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country Code</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="US" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="(555) 123-4567" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit */}
                <div className="mt-10">
                  <Button type="submit" className="w-full py-4 text-lg">
                    Create Account →
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>

      <Navbar />
    </div>
  );
};

export default RegisterPage;
