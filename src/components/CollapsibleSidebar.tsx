
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarItem {
  key: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface CollapsibleSidebarProps {
  items: SidebarItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProfile: React.ReactNode;
  quickStats?: React.ReactNode;
}

const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({
  items,
  activeTab,
  setActiveTab,
  userProfile,
  quickStats
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-80'} space-y-4`}>
      {/* Collapse Button */}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* User Profile Card */}
      {!isCollapsed && userProfile}

      {/* Navigation Cards */}
      <div className="space-y-3">
        {!isCollapsed && (
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2">Navigation</h3>
        )}
        {items.map((item, index) => (
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
            <CardContent className={`${isCollapsed ? 'p-3' : 'p-4'}`}>
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl ${item.color} shadow-sm`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                {!isCollapsed && (
                  <div>
                    <span className={`font-medium transition-colors ${
                      activeTab === item.key ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Card */}
      {!isCollapsed && quickStats}
    </div>
  );
};

export default CollapsibleSidebar;
