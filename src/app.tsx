import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import { HelmetProvider, Helmet} from 'react-helmet-async'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { ThemeProvider } from './components/themes/theme-provider'

export function App() {

  return (
    <HelmetProvider>
      <ThemeProvider storageKey='votter-theme' defaultTheme='dark'>
        <Helmet titleTemplate="%s"/>
        <Toaster richColors closeButton/>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
  
}

