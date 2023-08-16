import fs from "fs";
import path from "path";
import matter from "gray-matter";

const getPosts = () => {
    //const files = fs.readdirSync(path.join("posts"));
    const files = getAllFilesRecursively(path.join("posts"));
    console.log(files);
    const allPostsData = files.map((fileName) => {
        const post = fileName.replace(".mdx", "")
        console.log(post);
        const fileContents = fs.readFileSync(
            path.join(`${post}.mdx`),
            "utf8"
        );
        const { data } = matter(fileContents);
        return {
            post,
            data,
        };
    });

    console.log(allPostsData);

    return allPostsData;
};

const getAllFilesRecursively = (dir: string, files: string[] = []) => {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
        const name = path.join(dir, file);
        const isDirectory = fs.statSync(name).isDirectory();
        if (isDirectory) {
            getAllFilesRecursively(name, files);
        }
        else {
            files.push(name);
        }
    }
    return files;
};

export default getPosts;