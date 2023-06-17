import { Roboto_Mono } from 'next/font/google'
import {GitHub, Globe, Icon, Instagram, Key, Mail, Send, Server, Twitter, Video, Zap} from "react-feather";
import {FunctionComponent} from "react";

const RobotoMono = Roboto_Mono({ subsets: ['latin'] })

const projects: ProjectInfo[] = [
    {
        title: "Atlas",
        description: "Remote Video Controller and Client. Used at a public school event to control the videos on the projector",
        color: "bg-emerald-400",
        url: "https://github.com/rainloreley/atlas",
        // @ts-ignore
        icon: <Video size={25} />
    },
    {
        title: "Lyra",
        description: "Open-Source DMX light control software (WIP)",
        color: "bg-blue-400",
        url: "https://github.com/rainloreley/lyra",
        // @ts-ignore
        icon: <Zap size={25} />
    },
    {
        title: "StealthComm",
        description: "Website to contact the owner of a car anonymously",
        color: "bg-purple-400",
        url: "https://github.com/rainloreley/stealthcomm",
        // @ts-ignore
        icon: <Send size={25} />
    },
    {
        title: "Aurora",
        description: "Unofficial iOS app for Hetzner Cloud",
        color: "bg-yellow-400",
        url: "https://github.com/rainloreley/aurora",
        // @ts-ignore
        icon: <Server size={25} />
    },
    {
        title: "Spica",
        description: "iOS client for a social media website called Alles Micro",
        color: "bg-red-400",
        url: "https://github.com/rainloreley/Spica-iOS",
        // @ts-ignore
        icon: <Globe size={25} />
    }
]

export default function Home() {
  return (
    <main className={`p-4 w-full h-full dark:bg-dark-primary dark:text-white ${RobotoMono.className}`}>
      <div id={"header"} className={"h-12 flex items-center"}>
        <img alt={"profile picture"} src={"/pfp.jpg"} className={"w-10 h-10 rounded-lg"} />
        <p className={"ml-2 mb-0.5 font-bold"}>abmgrt.dev</p>
      </div>
        <div className={"w-full justify-center px-8 mt-20 md:flex"}>
            <div className={"w-full max-w-2xl md:max-w-md mx-auto break-words"}>
                <img alt={"profile picture"} src={"/pfp.jpg"} className={"w-28 h-28 rounded-2xl"} />
                <h1 className={"font-bold text-2xl mt-2"}>Adrian Baumgart</h1>
                <div className={"flex mt-2"}>
                    <a href={"mailto:adrian@abmgrt.dev"} title={"Email"} target={"_blank"} className={"pr-2"}>
                        <Mail size={21} />
                    </a>
                    <a href={"/pgp/adrian@abmgrt.dev.asc"} title={"PGP public key"} target={"_blank"} className={"px-2"}>
                        <Key size={21} />
                    </a>
                    <a href={"https://github.com/rainloreley"} title={"GitHub"} target={"_blank"} className={"px-2"}>
                        <GitHub size={21} />
                    </a>
                    <a href={"https://twitter.com/rainloreley"} title={"Twitter"} target={"_blank"} className={"px-2"}>
                        <Twitter size={21} />
                    </a>
                    <a href={"https://instagram.com/rainloreley"} title={"Instagram"} target={"_blank"} className={"px-2"}>
                        <Instagram size={21} />
                    </a>
                </div>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className={"mt-3"}>Heyo! I'm a self-taught fullstack developer, high school student and sound technician from Germany.</p>
                <img alt={"skill icons"} className={"mt-3"} src={"https://skillicons.dev/icons?i=html,css,js,ts,nodejs,react,tailwind,nextjs,git,github,flutter,dart,electron,docker,arduino,cloudflare,figma,linux,swift"} />
            </div>
            <div className={"md:w-full md:px-4 pb-4"}>
                <div className={"border-t-gray-200 border-t-2 mt-4 md:border-none md:mt-0"}>
                    <h2 className={"font-bold text-2xl mt-2 md:mt-0"}>Projects</h2>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>These are some of the projects I've worked on. You can find more on <a href={"https://github.com/rainloreley?tab=repositories"} target={"_blank"} className={"underline"}>GitHub</a>.</p>
                    <div className={"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2"}>
                        {projects.map((project) => (
                            <ProjectChip key={project.title} title={project.title} description={project.description} color={project.color} url={project.url} icon={project.icon} />
                        ))}
                    </div>
                </div>
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