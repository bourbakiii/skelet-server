import { v4 } from "uuid";
import { resolve } from "path";
import * as fs from 'fs';
class FileService {
    save(file, directory) {
        const name = v4() + ".png";
        file.mv(resolve(`static/${directory}/`, name));
        return name;
    }
    delete(name, directory) {
        try {
            fs.unlink(`static/${directory}/${name}`, (error) => {
                if (error) throw { message: `Ошибка при удалении файла ${name}`, error };
            });
        } catch (error) {
            console.log("File removing error: ");
            console.log(error);
            return error;
        }
    }
}

export default new FileService();
