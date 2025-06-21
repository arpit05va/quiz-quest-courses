
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Search, MoreHorizontal } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isMe: boolean;
}

interface ChatUser {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

interface ChatInterfaceProps {
  users: ChatUser[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I would love to discuss transitioning into tech leadership roles.",
      timestamp: "2024-06-21T10:30:00",
      isMe: false
    },
    {
      id: 2,
      text: "Hello! I'd be happy to help you with that. What specific areas are you looking to focus on?",
      timestamp: "2024-06-21T10:35:00",
      isMe: true
    },
    {
      id: 3,
      text: "I'm particularly interested in understanding how to make the transition from individual contributor to team lead.",
      timestamp: "2024-06-21T10:40:00",
      isMe: false
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      timestamp: new Date().toISOString(),
      isMe: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex h-[600px] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Chat List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-100 dark:bg-gray-700 border-none"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedUser?.id === user.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 dark:text-white truncate">{user.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(user.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">{user.lastMessage}</p>
                </div>
                {user.unread > 0 && (
                  <Badge variant="destructive" className="text-xs min-w-[20px] h-5 flex items-center justify-center">
                    {user.unread}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                    <AvatarFallback>{selectedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedUser.isOnline ? 'Active now' : 'Last seen recently'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.isMe
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isMe ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm" className="px-3">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a chat</h3>
              <p className="text-gray-500 dark:text-gray-400">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
