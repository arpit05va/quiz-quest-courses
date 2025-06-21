
import React, { useState } from 'react';
import DashboardWrapper from '@/components/DashboardWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, Clock, DollarSign, MessageSquare, Star, TrendingUp, Users, Video } from 'lucide-react';

const ExpertDashboardPage = () => {
  const [availableForBookings, setAvailableForBookings] = useState(true);

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

  return (
    <DashboardWrapper title="Expert Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Profile" />
              <AvatarFallback>SV</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Hi, Susheel</h1>
              <p className="text-muted-foreground">Welcome back to your expert dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">Available for bookings</span>
            <Switch
              checked={availableForBookings}
              onCheckedChange={setAvailableForBookings}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold">${expertStats.totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sessions Completed</p>
                  <p className="text-2xl font-bold">{expertStats.sessionsCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">{expertStats.rating}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                  <p className="text-2xl font-bold">{expertStats.responseRate}%</p>
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
            <p className="text-muted-foreground">Unlock the potential of your expert profile</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Add availability</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Complete your profile</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
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
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{session.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{session.clientName}</p>
                        <p className="text-sm text-muted-foreground">{session.topic}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
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
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{request.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{request.clientName}</p>
                          <p className="text-sm text-muted-foreground">
                            Requested: {new Date(request.requestedTime).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-green-600">${request.price}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{request.message}</p>
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
    </DashboardWrapper>
  );
};

export default ExpertDashboardPage;
