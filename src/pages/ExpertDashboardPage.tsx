import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, Clock, DollarSign, MessageSquare, Star, TrendingUp, Users, Video, Home, Settings, BarChart3, CreditCard, CheckCircle, Clock as ClockIcon } from 'lucide-react';

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
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'bookings', label: 'Bookings', icon: CalendarDays },
    { key: 'messages', label: 'Messages', icon: MessageSquare },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    { key: 'payments', label: 'Payments', icon: CreditCard },
    { key: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Profile" />
              <AvatarFallback>SV</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">Susheel Vashistha</p>
              <p className="text-sm text-gray-600">Expert</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-6">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.key
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hi, Susheel</h1>
              <p className="text-gray-600">Welcome back to your expert dashboard</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Available for bookings</span>
              <Switch
                checked={availableForBookings}
                onCheckedChange={setAvailableForBookings}
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
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

                <Card>
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

                <Card>
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

                <Card>
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
              <Card>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                <Card>
                  <CardHeader>
                    <CardTitle>Connection Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {connectionRequests.map((request) => (
                        <div key={request.id} className="p-4 border rounded-lg">
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
                            <Button size="sm" className="flex-1">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
              <p className="text-gray-600">This section is coming soon!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ExpertDashboardPage;
