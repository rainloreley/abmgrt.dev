import {createAdapter} from "webdav-fs";

// @ts-ignore
const wfs = createAdapter(process.env.WEBDAV_URL, {
    username: process.env.WEBDAV_USERNAME,
    password: process.env.WEBDAV_PASSWORD
});

const getPosts = async () => {
    return await getAllFilesRecursively("");
};

const getAllFilesRecursively = (dir: string, files: string[] = []): Promise<string[]> => {
    return new Promise<string[]>((resolve) => {
        wfs.readdir(dir, async (error, fileList) => {
            if (error) {
                console.log(error);
                resolve([]);
            }
            else {
                for await (const file of fileList as string[]) {
                    const name = `${dir}/${file}`//path.join(dir, file);
                    await new Promise((resolve2) => {
                        wfs.stat(name, (error, stat) => {
                            const isDirectory = stat?.isDirectory();
                            if (isDirectory) {
                                getAllFilesRecursively(name, files).then((_files) => {
                                    resolve2(0);
                                });
                            }
                            else {
                                files.push(name);
                                resolve2(1);
                            }
                        });
                    });
                }
                resolve(files);
            }
        });
    });
};

export default getPosts;