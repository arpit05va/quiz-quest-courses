
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, Clock, DollarSign, MessageSquare, Star, TrendingUp, Users, Video, Home, Settings, BarChart3, CreditCard, CheckCircle, Clock as ClockIcon } from 'lucide-react';
import DashboardWrapper from '@/components/DashboardWrapper';

const ExpertDashboardPage = () => {
  const [availableForBookings, setAvailableForBookings] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data - in real app, this would come from API
  const expertStats = {
    totalEarnings: 12450,
    sessionsCompleted: 127,
    rating: 4.9,
    responseRate: 98
  };

  const upcomingSessions = [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      topic: 'Product Management Career Transition',
      time: '2024-06-22T14:00:00',
      duration: 60,
      price: 99,
      type: 'video_call'
    },
    {
      id: 2,
      clientName: 'Mike Chen',
      topic: 'Leadership Strategy Discussion',
      time: '2024-06-23T10:30:00',
      duration: 45,
      price: 75,
      type: 'video_call'
    }
  ];

  const connectionRequests = [
    {
      id: 1,
      clientName: 'Alex Rivera',
      message: 'Hi! I would love to discuss transitioning into tech leadership roles.',
      requestedTime: '2024-06-24T15:00:00',
      price: 99
    }
  ];

  const sidebarItems = [
    { key: 'dashboard', label: 'Dashboard', icon: Home, color: 'bg-blue-500' },
    { key: 'bookings', label: 'Bookings', icon: CalendarDays, color: 'bg-green-500' },
    { key: 'messages', label: 'Messages', icon: MessageSquare, color: 'bg-purple-500' },
    { key: 'analytics', label: 'Analytics', icon: BarChart3, color: 'bg-orange-500' },
    { key: 'payments', label: 'Payments', icon: CreditCard, color: 'bg-pink-500' },
    { key: 'settings', label: 'Settings', icon: Settings, color: 'bg-gray-500' }
  ];

  return (
    <DashboardWrapper title="ExpertConnect - Expert Dashboard">
      <div className="min-h-screen bg-gray-50 flex gap-6">
        {/* Animated Card-based Sidebar */}
        <div className="w-80 space-y-4">
          {/* Expert Profile Card */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16 ring-4 ring-blue-100">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Profile" />
                  <AvatarFallback>SV</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Susheel Vashistha</h3>
                  <p className="text-sm text-gray-600">Industry Expert</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className={`w-2 h-2 rounded-full ${availableForBookings ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className={`text-xs font-medium ${availableForBookings ? 'text-green-600' : 'text-gray-500'}`}>
                      {availableForBookings ? 'Available' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Available for bookings</span>
                <Switch
                  checked={availableForBookings}
                  onCheckedChange={setAvailableForBookings}
                />
              </div>
            </CardContent>
          </Card>

          {/* Navigation Cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 px-2">Navigation</h3>
            {sidebarItems.map((item, index) => (
              <Card
                key={item.key}
                className={`cursor-pointer border-none shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-slide-in ${
                  activeTab === item.key
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveTab(item.key)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${item.color} shadow-sm`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className={`font-medium transition-colors ${
                        activeTab === item.key ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats Card */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Earnings</span>
                  <span className="font-bold text-green-600">${expertStats.totalEarnings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sessions</span>
                  <span className="font-medium">{expertStats.sessionsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="font-medium">{expertStats.rating}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                        <p className="text-2xl font-bold text-gray-900">${expertStats.totalEarnings.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Sessions Completed</p>
                        <p className="text-2xl font-bold text-gray-900">{expertStats.sessionsCompleted}</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Rating</p>
                        <p className="text-2xl font-bold text-gray-900">{expertStats.rating}</p>
                      </div>
                      <div className="p-3 bg-yellow-100 rounded-full">
                        <Star className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Response Rate</p>
                        <p className="text-2xl font-bold text-gray-900">{expertStats.responseRate}%</p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <MessageSquare className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Completion */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Make the page yours!</span>
                  </CardTitle>
                  <p className="text-gray-600">Unlock the potential of your expert profile</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Profile Completion</span>
                      <span className="text-sm text-gray-600">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Add availability</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <ClockIcon className="w-4 h-4 text-yellow-500" />
                        <span>Complete your profile</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <ClockIcon className="w-4 h-4 text-yellow-500" />
                        <span>Create a service</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Upcoming Sessions */}
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">
                                {session.clientName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{session.clientName}</p>
                              <p className="text-sm text-gray-600">{session.topic}</p>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{new Date(session.time).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">${session.price}</p>
                            <Badge variant="outline" className="text-xs">
                              {session.type === 'video_call' ? 'Video Call' : 'Message'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Connection Requests */}
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <CardHeader>
                    <CardTitle>Connection Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {connectionRequests.map((request) => (
                        <div key={request.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-medium text-sm">
                                  {request.clientName.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{request.clientName}</p>
                                <p className="text-sm text-gray-600">
                                  Requested: {new Date(request.requestedTime).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <p className="font-bold text-green-600">${request.price}</p>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{request.message}</p>
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1 hover:scale-105 transition-transform">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 hover:scale-105 transition-transform">
                              Decline
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Other tab content would go here */}
          {activeTab !== 'dashboard' && (
            <div className="text-center py-12">
              <Card className="border-none shadow-lg max-w-md mx-auto">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </h3>
                  <p className="text-gray-600">This section is coming soon!</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default ExpertDashboardPage;
