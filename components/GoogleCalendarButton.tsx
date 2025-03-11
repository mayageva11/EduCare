import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { googleConfig } from '../lib/googleConfig';

export default function GoogleCalendarButton() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user already has Google tokens in localStorage
    const googleTokens = localStorage.getItem('google_tokens');
    setIsLoggedIn(!!googleTokens);
  }, []);

  const handleGoogleLogin = () => {
    // Create the Google OAuth URL with required scopes
    const scope = encodeURIComponent(googleConfig.scopes.join(' '));
    const redirectUri = encodeURIComponent(googleConfig.redirectUri);
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleConfig.clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    
    // Redirect to Google's OAuth page
    window.location.href = authUrl;
  };

  const openGoogleCalendar = () => {
    window.open('https://calendar.google.com', '_blank');
  };

  return (
    <button 
      onClick={isLoggedIn ? openGoogleCalendar : handleGoogleLogin}
      className=" px-8 py-3 rounded-xl bg-blue-400 text-black font-semibold hover:bg-blue-500 transition-all duration-200 shadow-lgtext-xl "
    >
      היומן שלי
    </button>
  );
}