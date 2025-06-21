import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, Clock, DollarSign, MessageSquare, Star, TrendingUp, Users, Video, Home, Settings, BarChart3, CreditCard, CheckCircle, Clock as ClockIcon } from 'lucide-react';
import DashboardWrapper from '@/components/DashboardWrapper';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import ChatInterface from '@/components/ChatInterface';

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
      type: 'video_call',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      clientName: 'Mike Chen',
      topic: 'Leadership Strategy Discussion',
      time: '2024-06-23T10:30:00',
      duration: 45,
      price: 75,
      type: 'video_call',
      meetingLink: 'https://meet.google.com/xyz-uvwx-rst'
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

  const messages = [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      lastMessage: 'Thank you for the session! Could you send me those resources?',
      timestamp: '2024-06-21T16:30:00',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2c2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      clientName: 'Mike Chen',
      lastMessage: 'Looking forward to our session tomorrow!',
      timestamp: '2024-06-21T14:20:00',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const chatUsers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2c2?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thank you for the session! Could you send me those resources?',
      timestamp: '2024-06-21T16:30:00',
      unread: 1,
      isOnline: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Looking forward to our session tomorrow!',
      timestamp: '2024-06-21T14:20:00',
      unread: 0,
      isOnline: false
    }
  ];

  const sidebarItems = [
    { key: 'dashboard', label: 'Dashboard', icon: Home, color: 'bg-blue-500' },
    { key: 'bookings', label: 'Bookings', icon: CalendarDays, color: 'bg-green-500' },
    { key: 'chat', label: 'Chat', icon: MessageSquare, color: 'bg-purple-500' },
    { key: 'analytics', label: 'Analytics', icon: BarChart3, color: 'bg-orange-500' },
    { key: 'payments', label: 'Payments', icon: CreditCard, color: 'bg-pink-500' },
    { key: 'settings', label: 'Settings', icon: Settings, color: 'bg-gray-500' }
  ];

  const handleAcceptRequest = (requestId: number) => {
    console.log('Accepting request:', requestId);
    alert('Connection request accepted!');
  };

  const handleDeclineRequest = (requestId: number) => {
    console.log('Declining request:', requestId);
    alert('Connection request declined.');
  };

  const handleJoinMeeting = (meetingLink: string) => {
    window.open(meetingLink, '_blank');
  };

  const userProfile = (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 dark:bg-gray-800">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-16 h-16 ring-4 ring-blue-100 dark:ring-blue-800">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Profile" />
            <AvatarFallback>SV</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Susheel Vashistha</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Industry Expert</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className={`w-2 h-2 rounded-full ${availableForBookings ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className={`text-xs font-medium ${availableForBookings ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                {availableForBookings ? 'Available' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available for bookings</span>
          <Switch
            checked={availableForBookings}
            onCheckedChange={setAvailableForBookings}
          />
        </div>
      </CardContent>
    </Card>
  );

  const quickStats = (
    <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 dark:bg-gray-800 animate-fade-in" style={{ animationDelay: '0.7s' }}>
      <CardContent className="p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Overview</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Total Earnings</span>
            <span className="font-bold text-green-600 dark:text-green-400">${expertStats.totalEarnings}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Sessions</span>
            <span className="font-medium dark:text-white">{expertStats.sessionsCompleted}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Rating</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="font-medium dark:text-white">{expertStats.rating}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardWrapper title="ExpertConnect - Expert Dashboard">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex gap-6">
        {/* Collapsible Sidebar */}
        <CollapsibleSidebar
          items={sidebarItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userProfile={userProfile}
          quickStats={quickStats}
        />

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Earnings</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">${expertStats.totalEarnings.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in dark:bg-gray-800" style={{ animationDelay: '0.1s' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Sessions Completed</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{expertStats.sessionsCompleted}</p>
                      </div>
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in dark:bg-gray-800" style={{ animationDelay: '0.2s' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Rating</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{expertStats.rating}</p>
                      </div>
                      <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                        <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in dark:bg-gray-800" style={{ animationDelay: '0.3s' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Response Rate</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{expertStats.responseRate}%</p>
                      </div>
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Completion */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in dark:bg-gray-800" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 dark:text-white">
                    <TrendingUp className="w-5 h-5" />
                    <span>Make the page yours!</span>
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">Unlock the potential of your expert profile</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium dark:text-white">Profile Completion</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="dark:text-gray-300">Add availability</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <ClockIcon className="w-4 h-4 text-yellow-500" />
                        <span className="dark:text-gray-300">Complete your profile</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <ClockIcon className="w-4 h-4 text-yellow-500" />
                        <span className="dark:text-gray-300">Create a service</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Upcoming Sessions */}
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in dark:bg-gray-800" style={{ animationDelay: '0.5s' }}>
                  <CardHeader>
                    <CardTitle className="dark:text-white">Upcoming Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:border-gray-600">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                                {session.clientName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium dark:text-white">{session.clientName}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{session.topic}</p>
                              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>{new Date(session.time).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <p className="font-bold text-green-600 dark:text-green-400">${session.price}</p>
                            <Badge variant="outline" className="text-xs dark:border-gray-600">
                              {session.type === 'video_call' ? 'Video Call' : 'Message'}
                            </Badge>
                            {session.meetingLink && (
                              <Button 
                                size="sm" 
                                className="w-full hover:scale-105 transition-transform bg-green-600 hover:bg-green-700"
                                onClick={() => handleJoinMeeting(session.meetingLink)}
                              >
                                Join Meeting
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Connection Requests */}
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in dark:bg-gray-800" style={{ animationDelay: '0.6s' }}>
                  <CardHeader>
                    <CardTitle className="dark:text-white">Connection Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {connectionRequests.map((request) => (
                        <div key={request.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:border-gray-600">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">
                                  {request.clientName.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium dark:text-white">{request.clientName}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Requested: {new Date(request.requestedTime).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <p className="font-bold text-green-600 dark:text-green-400">${request.price}</p>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{request.message}</p>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="flex-1 hover:scale-105 transition-transform"
                              onClick={() => handleAcceptRequest(request.id)}
                            >
                              Accept
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1 hover:scale-105 transition-transform dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                              onClick={() => handleDeclineRequest(request.id)}
                            >
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

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <Card className="border-none shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">My Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:border-gray-600">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{session.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium dark:text-white">{session.clientName}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{session.topic}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(session.time).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="font-bold text-green-600 dark:text-green-400">${session.price}</p>
                        {session.meetingLink && (
                          <Button 
                            size="sm" 
                            className="hover:scale-105 transition-transform bg-green-600 hover:bg-green-700"
                            onClick={() => handleJoinMeeting(session.meetingLink)}
                          >
                            Join Meeting
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <Card className="border-none shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Chat</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ChatInterface users={chatUsers} />
              </CardContent>
            </Card>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <Card className="border-none shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Revenue</p>
                        <p className="text-2xl font-bold">${expertStats.totalEarnings}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-blue-200" />
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Sessions</p>
                        <p className="text-2xl font-bold">{expertStats.sessionsCompleted}</p>
                      </div>
                      <Users className="w-8 h-8 text-green-200" />
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Rating</p>
                        <p className="text-2xl font-bold">{expertStats.rating}</p>
                      </div>
                      <Star className="w-8 h-8 text-purple-200" />
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Response Rate</p>
                        <p className="text-2xl font-bold">{expertStats.responseRate}%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-orange-200" />
                    </div>
                  </Card>
                </div>
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Detailed Analytics Coming Soon</h3>
                  <p className="text-gray-600 dark:text-gray-300">Charts and detailed insights will be available here</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <Card className="border-none shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-4 border-2 border-green-200 dark:border-green-800">
                      <div className="text-center">
                        <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h3 className="font-semibold dark:text-white">Total Earnings</h3>
                        <p className="text-2xl font-bold text-green-600">${expertStats.totalEarnings}</p>
                      </div>
                    </Card>
                    <Card className="p-4 border-2 border-blue-200 dark:border-blue-800">
                      <div className="text-center">
                        <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-semibold dark:text-white">Pending</h3>
                        <p className="text-2xl font-bold text-blue-600">$450</p>
                      </div>
                    </Card>
                    <Card className="p-4 border-2 border-purple-200 dark:border-purple-800">
                      <div className="text-center">
                        <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <h3 className="font-semibold dark:text-white">Paid Out</h3>
                        <p className="text-2xl font-bold text-purple-600">$12,000</p>
                      </div>
                    </Card>
                  </div>
                  <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">Payment History</h3>
                    <p className="text-gray-600 dark:text-gray-300">Detailed payment history and management tools coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <Card className="border-none shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold dark:text-white">Availability Settings</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-600">
                      <div>
                        <h4 className="font-medium dark:text-white">Available for Bookings</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Allow new clients to book sessions with you</p>
                      </div>
                      <Switch
                        checked={availableForBookings}
                        onCheckedChange={setAvailableForBookings}
                      />
                    </div>
                  </div>
                  <div className="text-center py-8">
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">More Settings</h3>
                    <p className="text-gray-600 dark:text-gray-300">Additional settings and preferences will be available here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default ExpertDashboardPage;
