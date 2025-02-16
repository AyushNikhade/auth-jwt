import React, { useEffect } from 'react'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated}) {
   const navigate  = useNavigate();
   const location = useLocation();
  
   useEffect(() => {
    if (localStorage.getItem('token')) {
        setIsAuthenticated(true);
        if (location.pathname === '/' ||
            location.pathname === '/login' ||
            location.pathname === '/signup'
        ) {
            navigate('/home', { replace: false });
        }
    }
    }, [location, navigate, setIsAuthenticated])
  
    return (
    null
  )
}

export default RefreshHandler
