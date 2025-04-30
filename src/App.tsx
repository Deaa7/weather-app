 
import './App.css'
import { BrowserRouter , Route   ,Routes} from 'react-router-dom';
import Layout from './components/Layout';
import { useEffect } from 'react';
import WeatherDashboard from './pages/weather-dashboard';
import CityPage from './pages/city-page';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'sonner';
function App() {
 

  useEffect(() => {
  
    
    document.documentElement.classList.add('dark');
  }, []);


  const queryclient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes 
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: false,
        refetchOnWindowFocus:false,
      }
    }
  });
  
  return (
    <>

        <QueryClientProvider client={queryclient} >
      <BrowserRouter>
          
        <Layout>
          <Routes>
          <Route path='/' element={<WeatherDashboard/>} />
          <Route path='/city/:cityName' element={<CityPage/>} />
      
          </Routes>    
        </Layout>
       
          <Toaster richColors/>
      </BrowserRouter>
      </QueryClientProvider>
     
    </>
  )
}

export default App
