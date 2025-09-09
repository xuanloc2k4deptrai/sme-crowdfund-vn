import React, { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'urgent';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  category: 'investment' | 'campaign' | 'system' | 'milestone' | 'alert';
  priority: 'high' | 'medium' | 'low';
  metadata?: {
    campaignId?: number;
    amount?: number;
    investorName?: string;
  };
}

interface NotificationSystemProps {
  userRole: 'investor' | 'business';
  userId?: number;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ userRole, userId }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'priority'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock notifications data based on user role
    const mockNotifications: Notification[] = userRole === 'investor' ? [
      {
        id: '1',
        type: 'success',
        title: 'Đầu tư thành công',
        message: 'Bạn đã đầu tư thành công 50,000,000 VND vào chiến dịch TechStart Innovation',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        actionUrl: '/campaigns/1',
        actionText: 'Xem chiến dịch',
        category: 'investment',
        priority: 'high',
        metadata: { campaignId: 1, amount: 50000000 }
      },
      {
        id: '2',
        type: 'info',
        title: 'Cập nhật tiến độ',
        message: 'EcoFarm Organic đã đạt 80% mục tiêu gọi vốn. Milestone quan trọng!',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        read: false,
        actionUrl: '/campaigns/2',
        actionText: 'Xem tiến độ',
        category: 'milestone',
        priority: 'medium',
        metadata: { campaignId: 2 }
      },
      {
        id: '3',
        type: 'warning',
        title: 'Cảnh báo rủi ro',
        message: 'AI phát hiện portfolio của bạn có concentration risk cao ở ngành công nghệ (45%)',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
        actionUrl: '/dashboard/investor?tab=analytics',
        actionText: 'Xem phân tích',
        category: 'alert',
        priority: 'high'
      },
      {
        id: '4',
        type: 'info',
        title: 'Cơ hội đầu tư mới',
        message: 'GreenTech Energy - AI Match 95% với sở thích đầu tư của bạn',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        read: true,
        actionUrl: '/campaigns/3',
        actionText: 'Khám phá ngay',
        category: 'investment',
        priority: 'medium',
        metadata: { campaignId: 3 }
      },
      {
        id: '5',
        type: 'urgent',
        title: 'Thời hạn sắp hết',
        message: 'Chiến dịch HealthTech AI sẽ kết thúc trong 3 ngày. Đây là cơ hội cuối!',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        read: false,
        actionUrl: '/campaigns/4',
        actionText: 'Đầu tư ngay',
        category: 'campaign',
        priority: 'high',
        metadata: { campaignId: 4 }
      }
    ] : [
      {
        id: '1',
        type: 'success',
        title: 'Nhà đầu tư mới',
        message: 'Nguyễn Văn A đã đầu tư 25,000,000 VND vào chiến dịch TechStart 2024',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false,
        actionUrl: '/dashboard/business?tab=investors',
        actionText: 'Xem nhà đầu tư',
        category: 'investment',
        priority: 'high',
        metadata: { investorName: 'Nguyễn Văn A', amount: 25000000 }
      },
      {
        id: '2',
        type: 'info',
        title: 'Milestone đạt được',
        message: 'Chúc mừng! EcoFarm Project đã đạt 75% mục tiêu gọi vốn',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        actionUrl: '/campaigns/2',
        actionText: 'Cập nhật tiến độ',
        category: 'milestone',
        priority: 'medium',
        metadata: { campaignId: 2 }
      },
      {
        id: '3',
        type: 'warning',
        title: 'Cần cập nhật báo cáo',
        message: 'Báo cáo tài chính Q3 cho TechStart 2024 sẽ đến hạn trong 2 ngày',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        read: false,
        actionUrl: '/dashboard/business?tab=tasks',
        actionText: 'Hoàn thành ngay',
        category: 'system',
        priority: 'high'
      },
      {
        id: '4',
        type: 'info',
        title: 'AI Insight mới',
        message: 'AI phát hiện tỷ lệ chuyển đổi visitor sang investor của bạn tăng 25%',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        read: true,
        actionUrl: '/dashboard/business?tab=analytics',
        actionText: 'Xem phân tích',
        category: 'alert',
        priority: 'medium'
      },
      {
        id: '5',
        type: 'urgent',
        title: 'Cơ hội tăng funding',
        message: 'Peak investment time (7-9PM) - Đây là thời điểm tốt để đăng campaign update',
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        read: false,
        actionUrl: '/campaigns/create',
        actionText: 'Tạo update',
        category: 'campaign',
        priority: 'high'
      }
    ];

    setNotifications(mockNotifications);
    setLoading(false);
  }, [userRole]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const priorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  const getFilteredNotifications = () => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'priority':
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

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'urgent': return '🚨';
      default: return '📢';
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  if (loading) {
    return (
      <div className="relative">
        <button className="p-2 text-gray-400 hover:text-gray-600 relative">
          <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7 7 0 11-14 0v5h5l-5-5-5 5h5V7a9 9 0 0118 0v10z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-gray-600 relative transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7 7 0 11-14 0v5h5l-5-5-5 5h5V7a9 9 0 0118 0v10z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 w-96 bg-white rounded-xl shadow-xl border z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Thông báo</h3>
                <div className="flex items-center space-x-2">
                  {priorityCount > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      {priorityCount} ưu tiên
                    </span>
                  )}
                  <button
                    onClick={markAllAsRead}
                    className="text-blue-600 text-sm hover:text-blue-800"
                  >
                    Đánh dấu tất cả
                  </button>
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'Tất cả', count: notifications.length },
                  { key: 'unread', label: 'Chưa đọc', count: unreadCount },
                  { key: 'priority', label: 'Ưu tiên', count: priorityCount }
                ].map((filterOption) => (
                  <button
                    key={filterOption.key}
                    onClick={() => setFilter(filterOption.key as any)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                      filter === filterOption.key
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {filterOption.label} ({filterOption.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-64 overflow-y-auto">
              {getFilteredNotifications().length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="text-4xl mb-2">📭</div>
                  <p>Không có thông báo nào</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {getFilteredNotifications().map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition ${
                        !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                          <span className="text-sm">{getTypeIcon(notification.type)}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 mb-1">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                                {notification.message}
                              </p>
                              
                              {notification.metadata && (
                                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                                  {notification.metadata.amount && (
                                    <span>💰 {new Intl.NumberFormat('vi-VN').format(notification.metadata.amount)} VND</span>
                                  )}
                                  {notification.metadata.campaignId && (
                                    <span>🎯 Campaign #{notification.metadata.campaignId}</span>
                                  )}
                                  {notification.metadata.investorName && (
                                    <span>👤 {notification.metadata.investorName}</span>
                                  )}
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                                
                                <div className="flex items-center space-x-2">
                                  {!notification.read && (
                                    <button
                                      onClick={() => markAsRead(notification.id)}
                                      className="text-blue-600 text-xs hover:text-blue-800"
                                    >
                                      Đánh dấu đã đọc
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="text-red-600 text-xs hover:text-red-800"
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </div>
                              
                              {notification.actionUrl && notification.actionText && (
                                <a
                                  href={notification.actionUrl}
                                  className="inline-block mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {notification.actionText} →
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t bg-gray-50 text-center">
              <button 
                className="text-blue-600 text-sm font-medium hover:text-blue-800"
                onClick={() => setIsOpen(false)}
              >
                Xem tất cả thông báo
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationSystem;
