import matter from "gray-matter";
import { createAdapter } from "webdav-fs";

// @ts-ignore
const wfs = createAdapter(process.env.WEBDAV_URL, {
    username: process.env.WEBDAV_USERNAME,
    password: process.env.WEBDAV_PASSWORD
});

interface Post {
    data: {[p: string]: any},
    content: string;
}

const getPost = async (name: string): Promise<Post>  => {
    return new Promise<Post>((resolve) => {
        wfs.readFile(`${name}.md`, "utf8", (error, fileContents) => {
            if (error) {
                console.log(error);
                resolve({
                    data: {header: ["Error"]},
                    content: "Error while loading data from server"
                });
            }
            else {
                const { data, content } = matter(fileContents as string);
                resolve({
                    data,
                    content,
                });
            }
        });
    });

};

export default getPost;