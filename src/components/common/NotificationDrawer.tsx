import React, { useState, useEffect } from 'react';
import apiClient from '@/config/apiClient';

export function NotificationDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const res = await apiClient.get('/notifications');
      setNotifications(res.data);
      setUnreadCount(res.data.filter((n: any) => !n.isRead).length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const markAllRead = async () => {
    await apiClient.patch('/notifications/mark-all-read');
    fetchNotifications();
  };

  const markAsRead = async (id: string) => {
    await apiClient.patch(`/notifications/${id}/read`);
    fetchNotifications();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-charcoal/20">
      <div className="w-80 bg-white h-full shadow-2xl flex flex-col border-l border-rose/20 transform transition-transform">
        <div className="p-6 border-b border-rose/20 flex justify-between items-center bg-cream">
          <h2 className="font-garamond text-2xl text-plum">Notifications</h2>
          <button onClick={onClose} className="text-plum/50 hover:text-plum font-sans text-xl">&times;</button>
        </div>
        
        <div className="p-4 border-b border-rose/10 flex justify-between items-center">
          <span className="font-sans text-[10px] tracking-widest uppercase text-plum/60">{unreadCount} Unread</span>
          {unreadCount > 0 && (
             <button onClick={markAllRead} className="font-sans text-[10px] tracking-widest uppercase text-rose hover:text-plum">Mark all read</button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-plum/50 text-sm font-sans">No notifications</div>
          ) : (
            notifications.map(n => (
              <div 
                key={n._id} 
                className={`p-4 border-b border-rose/10 hover:bg-rose/5 transition-colors cursor-pointer ${!n.isRead ? 'bg-rose/5 border-l-4 border-l-rose' : ''}`}
                onClick={() => { if(!n.isRead) markAsRead(n._id); }}
              >
                <div className="font-sans text-xs font-bold text-plum mb-1 flex items-center justify-between">
                  {n.title}
                  <span className={`w-2 h-2 rounded-full ${n.type === 'error' ? 'bg-red-500' : n.type === 'success' ? 'bg-olive' : 'bg-rose'}`}></span>
                </div>
                <div className="font-sans text-xs text-plum/70">{n.message}</div>
                <div className="font-sans text-[9px] tracking-wider uppercase text-plum/40 mt-2">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
