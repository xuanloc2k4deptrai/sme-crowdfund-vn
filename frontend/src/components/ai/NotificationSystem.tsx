import React, { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'investment' | 'campaign' | 'system' | 'milestone';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

interface NotificationSystemProps {
  userRole: 'investor' | 'business';
  userId?: string;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ userRole, userId }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  useEffect(() => {
    // Mock AI-generated notifications based on user role
    const mockNotifications: Notification[] = userRole === 'investor' ? [
      {
        id: '1',
        type: 'success',
        category: 'investment',
        title: 'Đầu tư thành công',
        message: 'Bạn đã đầu tư thành công 50M VND vào TechStart Innovation',
        timestamp: new Date(),
        read: false,
        priority: 'high'
      },
      {
        id: '2',
        type: 'info',
        category: 'campaign',
        title: 'Cơ hội đầu tư mới',
        message: 'AI phát hiện chiến dịch phù hợp với portfolio của bạn',
        timestamp: new Date(Date.now() - 3600000),
        read: false,
        priority: 'medium'
      },
      {
        id: '3',
        type: 'warning',
        category: 'milestone',
        title: 'Cập nhật từ GreenTech',
        message: 'Chiến dịch GreenTech vừa đạt milestone quan trọng',
        timestamp: new Date(Date.now() - 7200000),
        read: true,
        priority: 'medium'
      }
    ] : [
      {
        id: '1',
        type: 'success',
        category: 'investment',
        title: 'Nhà đầu tư mới',
        message: 'Nguyễn Văn A vừa đầu tư 50M VND vào chiến dịch của bạn',
        timestamp: new Date(),
        read: false,
        priority: 'high'
      },
      {
        id: '2',
        type: 'info',
        category: 'campaign',
        title: 'Đề xuất tối ưu',
        message: 'AI đề xuất cập nhật mô tả chiến dịch để tăng tỷ lệ chuyển đổi',
        timestamp: new Date(Date.now() - 1800000),
        read: false,
        priority: 'medium'
      },
      {
        id: '3',
        type: 'warning',
        category: 'system',
        title: 'Yêu cầu cập nhật',
        message: 'Cần cập nhật báo cáo tài chính cho Q3/2024',
        timestamp: new Date(Date.now() - 3600000),
        read: true,
        priority: 'high'
      }
    ];

    setNotifications(mockNotifications);
  }, [userRole]);

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'high':
        return notifications.filter(n => n.priority === 'high');
      default:
        return notifications;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      default:
        return 'border-l-blue-500';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes} phút trước`;
    } else if (hours < 24) {
      return `${hours} giờ trước`;
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Thông báo</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm rounded-full transition ${
                  filter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 text-sm rounded-full transition ${
                  filter === 'unread' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Chưa đọc ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('high')}
                className={`px-3 py-1 text-sm rounded-full transition ${
                  filter === 'high' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Ưu tiên cao
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {getFilteredNotifications().length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Không có thông báo nào
              </div>
            ) : (
              getFilteredNotifications().map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-l-4 hover:bg-gray-50 cursor-pointer transition ${
                    getPriorityColor(notification.priority)
                  } ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          notification.category === 'investment' ? 'bg-green-100 text-green-800' :
                          notification.category === 'campaign' ? 'bg-blue-100 text-blue-800' :
                          notification.category === 'milestone' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {notification.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t bg-gray-50">
            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 transition">
              Xem tất cả thông báo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;
