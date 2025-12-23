import { Outlet } from "react-router-dom"

export const Main = () => {
    return (
        <main className="flex-grow mt-[70px] min-h-screen w-full px-6 flex flex-col items-center bg-black">
            <Outlet />
        </main>
    )
}