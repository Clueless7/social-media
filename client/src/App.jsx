import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense, lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContextProvider } from './context/authContext'
import Layout from './layouts/Layout'
import LoadingPage from './pages/LoadingPage'
const NotFound = lazy(() => import('./pages/NotFound'))
const SearchedProfiles = lazy(() => import('./pages/SearchedProfiles'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const Register = lazy(() => import('./pages/Register'))

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile/:profileId',
        element: <Profile />,
      },
      {
        path: '/search/:username',
        element: <SearchedProfiles />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const App = () => {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Suspense fallback={<LoadingPage />}>
            <RouterProvider router={router} />
          </Suspense>
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthContextProvider>
  )
}

export default App
