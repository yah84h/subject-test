
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  userName?: string;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userName, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white font-bold text-xl">اختباراتي</div>
            <span className="hidden sm:inline font-bold text-gray-700">منصة التعلم الذكي</span>
          </div>
          
          {userName && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600">أهلاً، {userName}</span>
              <button 
                onClick={onLogout}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                خروج
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} اختباراتي - جميع الحقوق محفوظة
      </footer>
    </div>
  );
};

export default Layout;
