import { Outlet } from "react-router-dom"

export const Main = () => {
    return (
        <main className="flex-grow mt-[4rem] md:mt-[6rem] min-h-screen w-full px-4 sm:px-6 flex flex-col items-center bg-black">
            <Outlet />
        </main>
    )
}