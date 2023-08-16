import {useRouter} from "next/router";

interface HeaderProps {
    title: string;
}
export default function Header({ title }: HeaderProps) {

    const router = useRouter();

    return (
        <div id={"header"} className={"h-12 flex items-center"}>
            <a onClick={async () => { await router.push("/"); }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={"profile picture"} src={"/pfp.jpg"} className={"w-10 h-10 rounded-lg"} />
            </a>
            <p className={"ml-2 mb-0.5 font-bold"}>{title}</p>
        </div>
    )
}