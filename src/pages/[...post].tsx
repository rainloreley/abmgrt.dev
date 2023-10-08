import { serialize } from 'next-mdx-remote/serialize'
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote'
import rehypeSlug from 'rehype-slug';
//import getPosts from "@/helpers/getPosts";
import Page from "@/components/page";
import styles from "../styles/Post.module.css";
import {useEffect, useState} from "react";
import { useRouter } from 'next/router'

interface ParsedPost {
    data: {[p: string]: any},
    content: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
}

export default function PostsPage() {
    const router = useRouter()
    const [post, setPost] = useState<ParsedPost | null>(null);

    useEffect(() => {
        const path = router.query.post;
        if (path) fetchData(path as string[]);
    }, [router.query.post]);

    const fetchData = async (path: string[]) => {
        const response = await fetch(`/api/getPost?filename=${path.join("/")}`)
        const fetchedPost = await response.json();
        const mdxSource = await serialize(fetchedPost.content, {
            mdxOptions: {
                development: process.env.NODE_ENV === 'development',
                rehypePlugins: [rehypeSlug],
            }
        });
        setPost((_) => {
            return {data: fetchedPost.data,
                content: mdxSource}
        });
    }

    return (
        <Page headerTitle={post?.data.header ?? "abmgrt.dev"}>
            {post != null ? (
                <div className={"flex justify-center"}>
                    <div className={`prose dark:prose-invert ${post.data.fullwidth ? "max-w-full" : ""} prose-h1:text-3xl leading-normal mb-8 ${styles.main}`}>
                        <span className={"text-gray-500 dark:text-gray-400"}>{post.data.date ? new Date(post.data.date).toLocaleDateString() : ""}</span>
                        <MDXRemote {...post.content} />
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </Page>
    )
}
/*
export const getStaticPaths = async () => {
    const response = await fetch(`${process.env.NEXT_URL}/api/getPosts`)
    const posts = (await response.json()).posts as string[];
    const paths = posts.map((post) => ({ params: { post: post.slice(1).replace(".md", "").split("/") } }));
    return {
        paths,
        fallback: false,
    };
};

// @ts-ignore
export const getStaticProps = async ({ params }) => {
    const response = await fetch(`${process.env.NEXT_URL}/api/getPost?filename=${params.post.join("/")}`)
    const post = (await response.json())

    //const post = await getPost(params.post.join("/"));
    const mdxSource = await serialize(post.content, {
        mdxOptions: {
            rehypePlugins: [rehypeSlug],
        }
    });
    return {
        props: {
            data: post.data,
            content: mdxSource,
        },
    };
};*/