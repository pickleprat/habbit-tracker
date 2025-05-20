import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { User as UserIcon, Lock, Phone, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import type { User } from "./types"; 

interface RegisterFormValues {
  userName: string | undefined;
  password: string | undefined;
  zipCode: string | undefined;
  countryCode: string | undefined;
  phoneNumber: string | undefined;
  city: string | undefined;
  address: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  middleName?: string | undefined;
}

type StatusType = 'idle' | 'loading' | 'success' | 'error';

const Register: React.FC = () => {
  const [createdUser, setCreatedUser] = useState<User | null>(null);
  const [status, setStatus] = useState<StatusType>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      userName: undefined,
      password: undefined,
      zipCode: undefined,
      countryCode: undefined,
      phoneNumber: undefined,
      city: undefined,
      address: undefined,
      firstName: undefined,
      lastName: undefined,
      middleName: undefined,
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    setStatus('loading');
    setErrorMessage('');
    
    const createUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const resJson = await res.json();
        
        if (!res.ok) {
          // Check for specific error codes or messages
          if (res.status === 409 || resJson.message?.includes('already exists')) {
            throw new Error('User already exists');
          } else {
            throw new Error(resJson.message || `HTTP error! status: ${res.status}`);
          }
        }

        console.log(resJson); 
        setCreatedUser(resJson); // ✅ Set the user in state
        setStatus('success');
        
        // Optional: Clear form after successful submission
        // form.reset();
      } catch (e) {
        console.error("Failed to create user:", e);
        setStatus('error');
        
        // Set appropriate error message
        if (e instanceof Error) {
          setErrorMessage('User already exists. Please choose a different username.');
        } else {
          setErrorMessage('Failed to create user. Please try again.');
        }
      }
    };

    createUser();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <Header title="Hobby Tracker" />

      <main className="flex-grow max-w-5xl mx-auto p-6 w-full mb-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
          <p className="text-gray-600 mt-2">Join our community and start tracking your hobbies</p>
        </div>

        <Card className="w-full border-gray-200 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Personal Information */}
              <CardHeader className="border-b border-gray-100 bg-gray-50 rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-xl">Personal Information</CardTitle>
                </div>
                <CardDescription>Tell us a little about yourself</CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John" className="focus:border-green-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    rules={{ required: "Last name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Lark" className="focus:border-green-500" />
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
                        <FormLabel className="text-gray-700">Middle Name <span className="text-gray-400 text-sm">(optional)</span></FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="A." className="focus:border-green-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userName"
                    rules={{ required: "User name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Username</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="larklordjohn" className="focus:border-green-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>

              {/* Security */}
              <CardHeader className="border-b border-t border-gray-100 bg-gray-50 mt-6">
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-xl">Security</CardTitle>
                </div>
                <CardDescription>Set a secure password for your account</CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <FormControl>
                        <Input
                          required
                          type="password"
                          {...field}
                          placeholder="••••••••"
                          className="focus:border-green-500"
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                    </FormItem>
                  )}
                />
              </CardContent>

              {/* Contact Information */}
              <CardHeader className="border-b border-t border-gray-100 bg-gray-50 mt-6">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </div>
                <CardDescription>How can we reach you?</CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Phone Number</FormLabel>
                        <FormControl>
                          <Input required {...field} placeholder="123 456 7890" className="focus:border-green-500" />
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
                        <FormLabel className="text-gray-700">Country Code</FormLabel>
                        <FormControl>
                          <Input required {...field} placeholder="+91" className="focus:border-green-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>

              {/* Address Information */}
              <CardHeader className="border-b border-t border-gray-100 bg-gray-50 mt-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-xl">Address</CardTitle>
                </div>
                <CardDescription>Your location information</CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Street Address</FormLabel>
                        <FormControl>
                          <Input required {...field} placeholder="123 Gandhi Rd" className="focus:border-green-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">City</FormLabel>
                          <FormControl>
                            <Input required {...field} placeholder="Mumbai" className="focus:border-green-500" />
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
                          <FormLabel className="text-gray-700">ZIP Code</FormLabel>
                          <FormControl>
                            <Input required {...field} placeholder="10001" className="focus:border-green-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>

              {/* Submit */}
              <CardFooter className="flex justify-end pt-6 pb-6 border-t mt-8 bg-gray-50">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 flex items-center gap-2"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </CardFooter>


            </form>
          </Form>
        </Card>

        {/* Status messages */}
        {status === 'success' && (
          <Alert className="mb-6 bg-green-50 border border-green-200 text-green-800">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 font-medium">Success!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your account has been created successfully.
              {createdUser?.userName && (
                <span className="font-semibold"> Welcome, {createdUser.userName}!</span>
              )}
            </AlertDescription>
          </Alert>
        )}

        {status === 'error' && (
          <Alert className="mb-6 bg-red-50 border border-red-200 text-red-800">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertTitle className="text-red-800 font-medium">Error</AlertTitle>
            <AlertDescription className="text-red-700">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}
      </main>

      <Navbar />
    </div>
  );
};

export default Register;
