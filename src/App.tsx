import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { AdminDashboard } from './pages/AdminDashboard';
import { UserInterface } from './pages/UserInterface';
import { SecuritySystem } from './pages/SecuritySystem';
import { ThreatsContextProvider } from './context/ThreatsContext';
import { ScanContextProvider } from './context/ScanContext';
import { UserTypeSelector } from './components/UserTypeSelector';

function App() {
  const [userType, setUserType] = useState<'admin' | 'user' | 'system'>('admin');

  return (
    <ThreatsContextProvider>
      <ScanContextProvider>
        <Layout>
          <UserTypeSelector userType={userType} setUserType={setUserType} />
          
          {userType === 'admin' && <AdminDashboard />}
          {userType === 'user' && <UserInterface />}
          {userType === 'system' && <SecuritySystem />}
        </Layout>
      </ScanContextProvider>
    </ThreatsContextProvider>
  );
}

export default App;