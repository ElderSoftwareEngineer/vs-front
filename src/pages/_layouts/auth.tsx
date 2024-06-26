import { Outlet } from "react-router-dom";
import { HeartHandshake } from 'lucide-react'

export function AuthLayout(){
    return (
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 antialiased">
            <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
                <div className="flex items-center gap-3 text-lg text-foreground">
                    <HeartHandshake className="h-5 w-5" />
                    <span className="font-semibold">VS</span>
                </div>
                <footer className="text-sm">
                    VS &copy; vs - {new Date().getFullYear()}
                </footer>
            </div>
            <div className="flex flex-col items-center justify-center relative">
                <Outlet />
            </div>
        </div>
    );
}