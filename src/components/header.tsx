import { Home,HeartHandshake } from 'lucide-react'
import { Separator } from './ui/separator'
import { NavLink } from './nav-link'
import { ThemeToggle } from './themes/theme-toggle'
import { AccountMenu } from './account-menu'
export function Header() {
    return (
        <div className="border-b">
            <div className="flex h-16 item-center gap-6 px-6">
                <HeartHandshake className="h-14 w-7" />
                <Separator orientation='vertical' className='h-8' />

                <nav className='flex items-center space-x-4 lg:space-x-6'>
                    <NavLink to="/">
                        <Home className="h-4 w-4" />
                        Início
                    </NavLink>
                    <NavLink to="/lista">
                        <HeartHandshake className="h-4 w-4" />
                        Lista
                    </NavLink>
                </nav>
                <div className='ml-auto flex items-center gap-2'>
                    <ThemeToggle />
                    <AccountMenu />
                </div>
                
            </div>
        </div>
    )
}