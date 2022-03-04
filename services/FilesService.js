import {v4} from 'uuid';
import {resolve} from 'path';
class FileService{
    save(file, directory = 'images'){
        const name = v4()+".png";
        file.mv(resolve(`static/${directory}/`,name));
        return name;
    }
}

export default new FileService();