import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { MyProvider } from './components/Myprovider'



ReactDOM.createRoot(document.getElementById('root')).render(
  <MyProvider>  
    <RouterProvider router={router} />
  </MyProvider>,
)