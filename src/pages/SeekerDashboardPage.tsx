
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Filter, Search, Star, MessageSquare, Video, Calendar, Bell, User, Home, Gift } from 'lucide-react';
import DashboardWrapper from '@/components/DashboardWrapper';

const SeekerDashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [activeTab, setActiveTab] = useState('find-experts');

  const categories = [
    'All Categories (3)',
    'Product Management (1)',
    'Software Engineering (1)',
    'Leadership (1)'
  ];

  const experts = [
    {
      id: 1,
      name: 'Pranita Bajoria',
      title: 'Senior Product Manager at Google',
      rating: 4.9,
      sessions: 150,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c2c2?w=150&h=150&fit=crop&crop=face',
      skills: ['Product Strategy', 'Career Growth'],
      bio: '10+ years in product management at top tech companies. Specialized in...',
      hourlyRate: 125
    },
    {
      id: 2,
      name: 'Aishwarya Srinivasan',
      title: 'Tech Lead at Microsoft',
      rating: 4.8,
      sessions: 200,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      skills: ['Software Engineering'],
      bio: 'Senior software engineer with expertise in distributed systems and team...',
      hourlyRate: 150
    },
    {
      id: 3,
      name: 'Colleen Ballesteros',
      title: 'VP of Engineering at Netflix',
      rating: 5.0,
      sessions: 75,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      skills: ['Engineering Leadership'],
      bio: 'Engineering executive with 15+ years building and scaling high-performance...',
      hourlyRate: 200
    }
  ];

  const myBookings = [
    {
      id: 1,
      expertName: 'Sarah Johnson',
      topic: 'Product Management Career Transition',
      date: '2024-06-25T14:00:00',
      status: 'confirmed',
      type: 'video_call',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    }
  ];

  const messages = [
    {
      id: 1,
      expertName: 'Pranita Bajoria',
      lastMessage: 'Thanks for your question about product strategy...',
      timestamp: '2024-06-21T10:30:00',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2c2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      expertName: 'Aishwarya Srinivasan',
      lastMessage: 'I can help you with the technical interview preparation...',
      timestamp: '2024-06-20T15:45:00',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const sidebarItems = [
    { key: 'dashboard', label: 'Dashboard', icon: Home, color: 'bg-blue-500' },
    { key: 'find-experts', label: 'Find Experts', icon: Search, color: 'bg-green-500' },
    { key: 'bookings', label: 'My Bookings', icon: Calendar, color: 'bg-purple-500' },
    { key: 'messages', label: 'Messages', icon: MessageSquare, color: 'bg-orange-500' },
    { key: 'rewards', label: 'Rewards', icon: Gift, color: 'bg-pink-500' }
  ];

  // Filter experts based on search and category
  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || 
                           selectedCategory.includes('All Categories') ||
                           expert.skills.some(skill => selectedCategory.toLowerCase().includes(skill.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  const handleBookExpert = (expertId: number) => {
    console.log('Booking expert:', expertId);
    // Here you would implement the booking logic
    alert('Booking feature will redirect to payment page');
  };

  const handleMessageExpert = (expertId: number) => {
    console.log('Messaging expert:', expertId);
    // Here you would implement the messaging logic
    setActiveTab('messages');
  };

  const handleViewBookingDetails = (bookingId: number) => {
    console.log('Viewing booking details:', bookingId);
    alert('Booking details modal would open here');
  };

  const handleJoinMeeting = (meetingLink: string) => {
    window.open(meetingLink, '_blank');
  };

  return (
    <DashboardWrapper title="ExpertConnect - Find Your Perfect Expert">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex gap-6">
        {/* Animated Card-based Sidebar */}
        <div className="w-80 space-y-4">
          {/* User Profile Card */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 ring-4 ring-blue-100 dark:ring-blue-800">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">John Doe</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Job Seeker</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2">Navigation</h3>
            {sidebarItems.map((item, index) => (
              <Card
                key={item.key}
                className={`cursor-pointer border-none shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-slide-in ${
                  activeTab === item.key
                    ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:ring-blue-400'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800'
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
                        activeTab === item.key ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'
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
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 dark:bg-gray-800 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Sessions Booked</span>
                  <span className="font-medium dark:text-white">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Experts Connected</span>
                  <span className="font-medium dark:text-white">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Rewards Points</span>
                  <span className="font-medium text-purple-600 dark:text-purple-400">250</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'find-experts' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card className="border-none shadow-lg dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search experts by name, skills, or company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <Button variant="outline" className="flex items-center space-x-2 hover:scale-105 transition-transform dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                      <Filter className="w-4 h-4" />
                      <span>Filters</span>
                    </Button>
                  </div>
                  
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="text-xs hover:scale-105 transition-transform dark:border-gray-600"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experts Grid */}
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredExperts.map((expert, index) => (
                  <Card 
                    key={expert.id} 
                    className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animate-fade-in dark:bg-gray-800"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="w-16 h-16 ring-2 ring-gray-100 dark:ring-gray-600">
                          <AvatarImage src={expert.image} alt={expert.name} />
                          <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg dark:text-white">{expert.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{expert.title}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium dark:text-white">{expert.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {expert.sessions} sessions
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {expert.bio}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {expert.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg text-green-600 dark:text-green-400">${expert.hourlyRate}/hour</span>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex items-center space-x-1 hover:scale-105 transition-transform dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                            onClick={() => handleMessageExpert(expert.id)}
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Message</span>
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex items-center space-x-1 hover:scale-105 transition-transform"
                            onClick={() => handleBookExpert(expert.id)}
                          >
                            <Video className="w-3 h-3" />
                            <span>Book</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredExperts.length === 0 && (
                <Card className="border-none shadow-lg dark:bg-gray-800">
                  <CardContent className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2 dark:text-white">No experts found</h3>
                    <p className="text-gray-600 dark:text-gray-300">Try adjusting your search criteria or browse all categories.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <Card className="border-none shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">My Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {myBookings.length > 0 ? (
                  <div className="space-y-4">
                    {myBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:border-gray-600">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>{booking.expertName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium dark:text-white">{booking.expertName}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{booking.topic}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                            {booking.status}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="hover:scale-105 transition-transform dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                            onClick={() => handleViewBookingDetails(booking.id)}
                          >
                            View Details
                          </Button>
                          {booking.status === 'confirmed' && booking.meetingLink && (
                            <Button 
                              size="sm" 
                              className="hover:scale-105 transition-transform bg-green-600 hover:bg-green-700"
                              onClick={() => handleJoinMeeting(booking.meetingLink)}
                            >
                              Join Meeting
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300">No bookings yet. Start by connecting with an expert!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <Card className="border-none shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer dark:border-gray-600">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={message.avatar} alt={message.expertName} />
                          <AvatarFallback>{message.expertName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium dark:text-white">{message.expertName}</h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(message.timestamp).toLocaleDateString()}
                              </span>
                              {message.unread > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {message.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{message.lastMessage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300">No messages yet. Start a conversation with an expert!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <Card className="border-none shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 dark:text-white">Unlock Rewards</h3>
                  <p className="text-gray-600 dark:text-gray-300">Complete sessions and earn points for exclusive benefits!</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default SeekerDashboardPage;
