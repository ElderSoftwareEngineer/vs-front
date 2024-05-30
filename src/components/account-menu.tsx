import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, 
    DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import  Cookies  from 'js-cookie'


export function AccountMenu() {
    const navigate = useNavigate();

    const signOut = () => {
        Cookies.remove('auth');
        navigate('/sign-in',{replace: true})
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex select-none items-center gap-2">
                    Votter System
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                    <span>Admin</span>
                    <span className="text-xs font-normal text-muted-foreground">
                        admin@vs.com.br
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Building className="mr-2 h-4 w-4" />
                    <span>Perfil do Administrador</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400">
                    <button className="w-full" onClick={signOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}