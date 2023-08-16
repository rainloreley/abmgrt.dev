import Header from "@/components/header";
import {Roboto_Mono} from "next/font/google";
const RobotoMono = Roboto_Mono({ subsets: ['latin'] })

interface PageProps {
    headerTitle: string;
    children: React.ReactNode;
}

export default function Page({headerTitle, children}: PageProps) {
    return (
        <main className={`p-4 w-full h-full dark:bg-dark-primary dark:text-white ${RobotoMono.className}`}>
            <Header title={headerTitle} />
            <div className={"w-full px-4 mt-10"}>
                {children}
            </div>
        </main>
    )
}