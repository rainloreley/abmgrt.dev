import {NextApiRequest, NextApiResponse} from "next";
import {createAdapter} from "webdav-fs";
import matter from "gray-matter";

// @ts-ignore
const wfs = createAdapter(process.env.WEBDAV_URL, {
    username: process.env.WEBDAV_USERNAME,
    password: process.env.WEBDAV_PASSWORD
});
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const filename: string = req.query.filename as string ?? "";
    if (filename.length == 0) return res.status(400).json({err: "invalidRequest"});

    const post = await getPost(filename);
    res.status(200).json(post);

}

export const config = {
    api: {
        bodyParser: true
    }
}

export interface Post {
    data: {[p: string]: any},
    content: string;
}

const getPost = async (name: string): Promise<Post>  => {
    return new Promise<Post>((resolve) => {
        wfs.readFile(`${name}.md`, "utf8", (error, fileContents) => {
            if (error) {
                // @ts-ignore
                if (error.status == "404") {
                    resolve({
                        data: {},
                        content: `# 404 - Not found\nThe page you're trying to access doesn't exist!\n<img src="https://http.cat/status/404.jpg" alt="Picture of a cat hiding"/>`
                    })
                }
                else {
                    resolve({
                        data: {header: ["Error"]},
                        content: "Error while loading data from server"
                    });
                }
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