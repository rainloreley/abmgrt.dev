import { serialize } from 'next-mdx-remote/serialize'
import {MDXRemote} from 'next-mdx-remote'
import rehypeSlug from 'rehype-slug';
import getPost from "@/helpers/getPost";
import getPosts from "@/helpers/getPosts";
import Page from "@/components/page";
// @ts-ignore
export default function PostsPage({ data, content }) {
    return (
        <Page headerTitle={data.header ?? "abmgrt.dev"}>
            <div className="prose dark:prose-invert prose-h1:text-3xl max-w-full leading-normal mb-8">
                <MDXRemote {...content} />
            </div>
        </Page>
    )
}

export const getStaticPaths = async () => {
    const posts = getPosts();
    const paths = posts.map((post) => ({ params: { post: post.post.slice(6).split("\\") } }));
    console.log(JSON.stringify(paths));
    return {
        paths,
        fallback: false,
    };
};

// @ts-ignore
export const getStaticProps = async ({ params }) => {
    console.log(params.post);
    const post = getPost(params.post.join("\\"));
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