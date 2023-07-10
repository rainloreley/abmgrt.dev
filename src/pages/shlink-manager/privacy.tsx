import { Roboto_Mono } from 'next/font/google'
import {GitHub, Globe, Icon, Instagram, Key, Mail, Send, Server, Twitter, Video, Zap} from "react-feather";
import {FunctionComponent} from "react";

const RobotoMono = Roboto_Mono({ subsets: ['latin'] })
export default function ShlinkManager_Privacy() {
    return (
        <main className={`p-4 w-full h-full dark:bg-dark-primary dark:text-white ${RobotoMono.className}`}>
            <div id={"header"} className={"h-12 flex items-center"}>
                <img alt={"profile picture"} src={"/pfp.jpg"} className={"w-10 h-10 rounded-lg"} />
                <p className={"ml-2 mb-0.5 font-bold"}>Privacy Policy - Shlink Manager</p>
            </div>
            <div className={"w-full px-4 mt-10"}>
                <h1 className={"text-2xl font-bold"}>Privacy Policy for Shlink Manager (Android)</h1>
                <div className={"py-2 px-2"}>
                    <p>Shlink Manager (for Android) does not collect any user data.</p>
                    <p>The only connection to the internet takes place when requesting data from the Shlink instance. In this case, user-provided information gets sent to the server, which was configured upon the first app launch.</p>
                    <p>The owner of this instance is responsible for any data. We are not affiliated with Shlink and do not store user data stored on the instance anywhere else except on your local device.</p>
                    <p>This project is open source. Feel free to <a className={"underline text-blue-500"} href={"https://github.com/rainloreley/shlink-manager"} target={"_blank"}>check the source code yourself.</a></p>
                </div>
            </div>
        </main>
    )
}

type ProjectInfo = {
    title: string,
    description: string,
    color: string,
    url: string,
    icon: Icon | undefined
}

const ProjectChip: FunctionComponent<ProjectInfo> = ({title, description, color, url, icon}) => {
    return (
        <a href={url} target={"_blank"} className={`${color} rounded-lg bg-opacity-40 hover:bg-opacity-50 p-4 max-w-xl mt-2 flex items-center`}>
            {icon != undefined ? <div className={"mr-4"}>
                    {/* @ts-ignore */}
                    {icon}
                </div>
                : <div />}
            <div>
                <h3 className={"font-bold text-lg"}>{title}</h3>
                <p className={"text-sm mt-1"}>{description}</p>
            </div>
        </a>
    )
}