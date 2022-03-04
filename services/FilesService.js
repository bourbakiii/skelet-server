import { v4 } from "uuid";
import { resolve } from "path";
import * as fs from 'fs';
class FileService {
  save(file, directory = "images") {
    const name = v4() + ".png";
    file.mv(resolve(`static/${directory}/`, name));
    return name;
  }
  delete(name, directory) {
    try {
      fs.unlink(directory + name, (err) => {
        if (err) throw { message: "Ошибка при удалении файла", error };
      });
    } catch (error) {
      console.log("File removing error: ");
      console.log(error);
    }
  }
}

export default new FileService();
