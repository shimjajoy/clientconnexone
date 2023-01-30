import React, { useEffect, useState } from 'react';
import { fetchData } from './middleware/api';
import Home from './pages/Home/Home';

const App = () => {
  //loaded is set to false initially
  const [loaded, setLoaded] = useState(false);
  //getAuthTokens method is called only once when the component is mounted
  useEffect(() => {
    getAuthTokens();
  }, []);
  //function used to retrieve the accessToken and refreshToken from the API
  const getAuthTokens = async () => {
    try {
      //fetch api token
      const response = await fetchData('token');
      //destructuing accessToken and accessToken from response
      const { accessToken, refreshToken } = await response;
      //saves the accessToken,refreshToken in the local storage.
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      // set loaded to true
      setLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };
  //JSX code that is returned by the component.
  return (
    <div>
      {loaded ? <Home /> : <h1>Loading.....</h1>}
    </div>
  );
};
export default App;
