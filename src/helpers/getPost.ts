import fs from "fs";
import path from "path";
import matter from "gray-matter";

const getPost = (name: string) => {
    const fileContents = fs.readFileSync(path.join(`posts/${name}.mdx`), "utf8");
    const { data, content } = matter(fileContents);
    return {
        data,
        content,
    };
};

export default getPost;