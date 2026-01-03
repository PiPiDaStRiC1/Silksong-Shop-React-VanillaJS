import { Outlet } from "react-router-dom"

export const Main = () => {
    return (
        <main className="flex-grow mt-[70px] justify-center min-h-screen w-full px-6 flex flex-col items-center bg-black">
            <Outlet />
        </main>
    )
}