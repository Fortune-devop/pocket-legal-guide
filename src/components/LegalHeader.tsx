import React from 'react';
import { Gavel, Menu, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavLink } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const LegalHeader: React.FC = () => {
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
          
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
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
          </SignedOut>
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
                
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
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
                </SignedOut>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default LegalHeader;
