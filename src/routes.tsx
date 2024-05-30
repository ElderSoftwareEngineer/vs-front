import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "./pages/_layouts/app"
import { AuthLayout } from "./pages/_layouts/auth"
import { SignIn } from "./pages/auth/sign-in"
import { SignUp } from "./pages/auth/sign-up"
import { Lists } from "./pages/app/lists/lists"
import { Dashboard } from "./pages/app/dashboard/dashboard"
import { NotFound } from "./pages/404"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <NotFound/>,
        children: [
            {path: '/', element: <Dashboard/>},
            {path: '/lista', element: <Lists/>}
        ]
    },

    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {path: '/sign-in', element: <SignIn/>},
            {path: '/sign-up', element: <SignUp/>},
        ]
    }
    // {path: "/",element: <Dashboard />},
    // {path: "/sign-in", element: <SignIn />}
])