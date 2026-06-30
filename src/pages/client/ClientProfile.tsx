import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Shield } from 'lucide-react';

export default function ClientProfile() {
  const { user } = useAuth();

  return (
    <div className="p-8 max-w-xl">
      <div className="mb-8 border-b border-rose/10 pb-6">
        <h1 className="text-3xl font-light text-plum">My <span className="italic font-serif">Profile</span></h1>
        <p className="font-sans text-xs text-plum/50 mt-1 tracking-wide">Your account details</p>
      </div>

      <div className="bg-white border border-rose/10 divide-y divide-rose/5">
        <div className="flex items-center gap-4 p-5">
          <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center">
            <User size={16} className="text-rose" />
          </div>
          <div>
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-plum/40 mb-1">Full Name</p>
            <p className="font-sans text-sm text-plum">{user?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5">
          <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center">
            <Mail size={16} className="text-rose" />
          </div>
          <div>
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-plum/40 mb-1">Email Address</p>
            <p className="font-sans text-sm text-plum">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5">
          <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center">
            <Shield size={16} className="text-rose" />
          </div>
          <div>
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-plum/40 mb-1">Account Role</p>
            <p className="font-sans text-sm text-plum capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      <p className="font-sans text-[10px] text-plum/30 tracking-wide mt-6">
        To update your name, email or password, please contact us at{' '}
        <a href="mailto:hello@luxuryevents.com" className="text-rose hover:text-plum transition-colors underline">
          hello@luxuryevents.com
        </a>
      </p>
    </div>
  );
}
