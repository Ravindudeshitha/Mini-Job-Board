'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


type UserContextType = {
    currentUser: cUser | null;
    login: (email: string, password: string) => Promise<{ status: string; message: string }>;
    register: (email: string, password: string, name: string) => Promise<{ status: string; message: string }>;
    logout: () => Promise<{ status: string;}>;
    setCurrentUser: React.Dispatch<React.SetStateAction<cUser | null>>;
};

interface cUser{
  companyId?: number;
  companyName?: string;
  id? : number;
  name?: string;
  email?: string;
  image?: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({children}: {children: ReactNode}) {
    const [currentUser, setCurrentUser] = useState<cUser | null>(null);

    useEffect(() => {
        // const storedUser = localStorage.getItem('user');
        // if (storedUser) {
        // try {
        //     setCurrentUser(JSON.parse(storedUser));
        // } catch (error) {
        //     console.error('Failed to parse stored user:', error);
        //     localStorage.removeItem('user');
        // }
        // }

        // // Fetch user from backend to verify session
        // async function fetchUser() {
        // try {
        //     const response = await fetch('/api/auth/user', { credentials: 'include' });
        //     if (response.ok) {
        //     const userData: User = await response.json();
        //     setCurrentUser(userData);
        //     localStorage.setItem('user', JSON.stringify(userData));
        //     } else {
        //     setCurrentUser(null);
        //     localStorage.removeItem('user');
        //     }
        // } catch (error) {
        //     console.error('Failed to fetch user:', error);
        //     setCurrentUser(null);
        //     localStorage.removeItem('user');
        // }
        // }
        // fetchUser();

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    } else {
      // Create dummy user data if none exists
      // const dummyUser: User = {
      //   id: 1,
      //   name: 'John Doe',
      //   email: 'john.doe@example.com',
      //   image: '/images/default.jpg', // Default image
      // };
      // localStorage.setItem('user', JSON.stringify(dummyUser));
      // setCurrentUser(dummyUser);
    }
    }, []);

  // Login function
  const login = async (email: string, password: string) => {
    const data = {
        email,
        password
    }
    try{
      const response = await fetch('/api/login', {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": 'application/json'
        },
        method: 'POST',
        credentials: 'include',
      })

      if(!response.ok) {
        if(response.status === 401){
          return {status: 'error', message: 'Invalid email or password'}
        }
      }
      
      const userData: cUser = await response.json();
      setCurrentUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return {status: 'success', message: 'Login successful'}
    }
    catch(e){
      console.log(e);
      setCurrentUser(null);
      localStorage.removeItem('user');
      return {status: 'error', message: 'Something went wrong'}
    }
  };

  // Register function
  const register = async ( name: string, email: string, password: string) => {
    const data = {
        name,
        email,
        password
    }
    try{
      const response = await fetch('/api/register', {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": 'application/json'
        },
        method: 'POST'
      })
      
      if(!response.ok) {
        if(response.status === 401){
          return {status: 'error', message: 'Invalid email or password'}
        }
        else if (response.status === 409){
          return {status: 'error', message: 'User with this email already exists'}
        }
      }

      return {status: 'success', message: 'Registration successful'}


    }
    catch(e){
      console.log(e);
      setCurrentUser(null);
      localStorage.removeItem('user');
      return {status: 'error', message: 'Something went wrong'}
    }
  };

  // Logout function
  const logout = async () => {
    // try {
    //   await fetch('/api/auth/logout', {
    //     method: 'POST',
    //     credentials: 'include',
    //   });
    // } catch (error) {
    //   console.error('Logout error:', error);
    // } finally {
    //   setCurrentUser(null);
    //   localStorage.removeItem('user');
    //   // Clear cookie (optional, since backend handles it)
    //   document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // }

    setCurrentUser(null);
    localStorage.removeItem('user');
    return {status: 'success'}
  };

  return (
    <UserContext.Provider value={{ currentUser, login, register, logout, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );

}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}