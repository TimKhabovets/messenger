import React, { useState, useEffect } from 'react';
import GlobalContext from "./shared/contexts/GlobalContext";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./common/routes/AppRoutes";

function App() {
  const [name, setName] = useState(localStorage.getItem('name') || '');

  return (
    <GlobalContext.Provider value={{
      name,
      setName
    }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
