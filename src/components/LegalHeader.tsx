
import React from 'react';
import { Gavel, Menu, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LegalHeader: React.FC = () => {
  const { isSignedIn, user, signOut } = useAuth();
  
  const getInitials = () => {
    if (!user) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-legal-border shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <Gavel className="h-6 w-6 text-legal-primary" />
            <span className="text-xl text-legal-primary">Pocket Legal</span>
          </NavLink>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/" className="text-sm font-medium hover:text-legal-primary transition-colors">
            Home
          </NavLink>
          <NavLink to="/chat" className="text-sm font-medium hover:text-legal-primary transition-colors">
            AI Chat
          </NavLink>
          <NavLink to="/topics" className="text-sm font-medium hover:text-legal-primary transition-colors">
            Topics
          </NavLink>
          <NavLink to="/documents" className="text-sm font-medium hover:text-legal-primary transition-colors">
            Documents
          </NavLink>
          
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.imageUrl} alt={user?.firstName} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.firstName} {user?.lastName}</DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs text-gray-500">{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <NavLink to="/sign-in">
                <Button variant="ghost" size="sm">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </NavLink>
              <NavLink to="/sign-up">
                <Button variant="default" size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </NavLink>
            </>
          )}
        </div>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `p-2 rounded-md ${isActive ? 'bg-legal-primary text-white' : 'hover:bg-legal-background'}`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/chat" 
                  className={({ isActive }) => 
                    `p-2 rounded-md ${isActive ? 'bg-legal-primary text-white' : 'hover:bg-legal-background'}`
                  }
                >
                  AI Chat
                </NavLink>
                <NavLink 
                  to="/topics" 
                  className={({ isActive }) => 
                    `p-2 rounded-md ${isActive ? 'bg-legal-primary text-white' : 'hover:bg-legal-background'}`
                  }
                >
                  Legal Topics
                </NavLink>
                <NavLink 
                  to="/documents" 
                  className={({ isActive }) => 
                    `p-2 rounded-md ${isActive ? 'bg-legal-primary text-white' : 'hover:bg-legal-background'}`
                  }
                >
                  Documents
                </NavLink>
                
                {isSignedIn ? (
                  <>
                    <div className="flex items-center gap-3 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.imageUrl} alt={user?.firstName} />
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={signOut} className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <NavLink 
                      to="/sign-in" 
                      className={({ isActive }) => 
                        `p-2 rounded-md ${isActive ? 'bg-legal-primary text-white' : 'hover:bg-legal-background'}`
                      }
                    >
                      Sign In
                    </NavLink>
                    <NavLink 
                      to="/sign-up" 
                      className={({ isActive }) => 
                        `p-2 rounded-md ${isActive ? 'bg-legal-primary text-white' : 'hover:bg-legal-background'}`
                      }
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default LegalHeader;
