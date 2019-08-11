import fs from 'fs'
import path from 'path'

import {makeStorage} from './storage'

export const makeFsAPI= (options) =>{
  return {
    pathjoin: path.join,
    read: fs.readFileSync,
    write: fs.writeFileSync,
    remove: fs.unlinkSync,
    create_dir: name => {
      if (!fs.existsSync(options.storage_dir)){
        fs.mkdirSync(options.storage_dir,{recursive:true});
      }
    },
    namer: name => { return path.join(options.storage_dir,name)}
  }
}

const filenamer = fsAPI=> _options => name => { return fsAPI.pathjoin(_options.storage_dir,name)}


export const storage = makeStorage(makeFsAPI)
