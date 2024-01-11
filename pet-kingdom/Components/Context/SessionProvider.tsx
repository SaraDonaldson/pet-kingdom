"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

interface SessionData {
  userName: string;
  isAuthenticated: boolean;
  setUserSession: (userName: string, isAuthenticated: boolean, remember?:boolean) => void;
}

export const SessionContext = createContext<SessionData>({
  userName: '',
  isAuthenticated: false,
  setUserSession: () => {}
});

// Cookie handling functions
const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };
  
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts:string[] = value.split(`; ${name}=`);
    if (parts.length === 2){
     return parts.pop()?.split(';').shift();
    } 
    return '';
  };
  
  const checkCookie = (cookieName: string) => {
    return getCookie(cookieName) !== '';
  };
  
  // LocalStorage functions
  function setLocalStorage(key: string, value: any) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }
  
  function getLocalStorage(key: string, initialValue: any) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      console.error("Error reading from localStorage", e);
      return initialValue;
    }
  }
  
  export const SessionProvider = ({ children }: any) => {
      const [userName, setUserName] = useState<string>('');
      const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
      useEffect(() => {
          if (checkCookie('userSession')) {
            const sessionData = getLocalStorage('sessionData', { userName: '', isAuthenticated: false });
            setUserName(sessionData.userName);
            setIsAuthenticated(sessionData.isAuthenticated);
          } else {
            setLocalStorage('sessionData', { userName: '', isAuthenticated: false });
            setUserName('');
            setIsAuthenticated(false);
          }
      }, []);
  
      const setUserSession = (newUserName: string, newIsAuthenticated: boolean, remember?:boolean) => {
        console.log('remember me: ', remember)
        setUserName(newUserName);
        setIsAuthenticated(newIsAuthenticated);
        if (newIsAuthenticated) {
          if(remember){
            console.log('90 days')
            //if user selected to be remembered then set for 90 days 
            setCookie('userSession', 'active', 90);  
          }else{
            console.log('1 days')
            // Set a cookie for 1 day
            setCookie('userSession', 'active', 1);
          }
          setLocalStorage('sessionData', { userName: newUserName, isAuthenticated: newIsAuthenticated });
        } else {
          // Clear cookie and localStorage if logging out
          setCookie('userSession', '', -1);
          setLocalStorage('sessionData', { userName: '', isAuthenticated: false });
        }
      };



return (
    <SessionContext.Provider value={{ userName, isAuthenticated, setUserSession }}>
      {children}
    </SessionContext.Provider>
  );
};