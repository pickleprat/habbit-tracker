
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
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { User as UserIcon, Lock, Phone, MapPin, CheckCircle } from 'lucide-react';

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

const Register: React.FC = () => {
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Doe" className="focus:border-green-500" />
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Username</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="johndoe123" className="focus:border-green-500" />
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
                          <Input {...field} placeholder="(555) 123-4567" className="focus:border-green-500" />
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
                          <Input {...field} placeholder="US" className="focus:border-green-500" />
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
                          <Input {...field} placeholder="123 Main St" className="focus:border-green-500" />
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
                            <Input {...field} placeholder="New York" className="focus:border-green-500" />
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
                            <Input {...field} placeholder="10001" className="focus:border-green-500" />
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
                >
                  <span>Create Account</span>
                  <CheckCircle className="w-5 h-5" />
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </main>

      <Navbar />
    </div>
  );
};

export default Register;
