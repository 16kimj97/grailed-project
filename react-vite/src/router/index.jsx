import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ClothingList from '../components/ClothingList/ClothingList';
import ClothingDetails from '../components/ClothingDetails/ClothingDetails';
import UserClothing from '../components/UserClothing/UserClothing';
import UpdateClothing from '../components/UpdateClothing/UpdateClothing';
import CreateClothing from '../components/CreateClothing/CreateClothing';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ClothingList />,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "/clothing/:clothingId",
        element: <ClothingDetails />,
      },
      {
        path: "/user/current/clothing",
        element: <UserClothing />
      },
      {
        path:"/update/:itemId",
        element: <UpdateClothing />
      },
      {
        path:'/clothing/new',
        element: <CreateClothing />
      }
    ],
  },
]);
