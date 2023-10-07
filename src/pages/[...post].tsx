import { serialize } from 'next-mdx-remote/serialize'
import {MDXRemote} from 'next-mdx-remote'
import rehypeSlug from 'rehype-slug';
import getPost from "@/helpers/getPost";
import getPosts from "@/helpers/getPosts";
import Page from "@/components/page";
import styles from "../styles/Post.module.css";
// @ts-ignore
export default function PostsPage({ data, content }) {
    return (
        <Page headerTitle={data?.header ?? "abmgrt.dev"}>
            <div className={"flex justify-center"}>
                <div className={`prose dark:prose-invert max-w-full prose-h1:text-3xl leading-normal mb-8 ${styles.main}`}>
                    <span className={"text-gray-500 dark:text-gray-400"}>{new Date(data.date).toLocaleDateString()}</span>
                    <MDXRemote {...content} />
                </div>
            </div>
        </Page>
    )
}

export const getStaticPaths = async () => {
    const posts = await getPosts();
    const paths = posts.map((post) => ({ params: { post: post.slice(1).replace(".md", "").split("/") } }));
    return {
        paths,
        fallback: false,
    };
};

// @ts-ignore
export const getStaticProps = async ({ params }) => {
    const post = await getPost(params.post.join("/"));
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
};