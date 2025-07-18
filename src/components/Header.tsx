import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from './AuthProvider';
import { LogOut, Settings, User, Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-card border-b shadow-card">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Portal Mendix</h1>
          </div>
          
          <nav className="flex space-x-2">
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'default' : 'ghost'} 
                size="sm"
                className={location.pathname === '/' ? 'bg-gradient-primary' : ''}
              >
                Pacotes
              </Button>
            </Link>
            {user?.isAdmin && (
              <Link to="/admin">
                <Button 
                  variant={location.pathname === '/admin' ? 'default' : 'ghost'} 
                  size="sm"
                  className={location.pathname === '/admin' ? 'bg-gradient-primary' : ''}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{user?.email}</span>
            {user?.isAdmin && (
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
                Admin
              </span>
            )}
          </div>
          
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};