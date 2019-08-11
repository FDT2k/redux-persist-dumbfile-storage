
const configureStorage = fsAPI=> options =>{
  if(typeof options !=='object'){
    throw new Error('options must be an object')
  }
  if(typeof options.storage_dir !== 'string' || options.storage_dir ===''){
    throw new Error ('storage_dir must be set');
  }

  return options;
}

export const makeStorage = fsAPI=> options => {
  let _options = configureStorage(fsAPI)(options);

  fsAPI(options).create_dir(options.storage_dir);

  let api = fsAPI(_options)


  return {
    setItem: setItem(api.write)(api.namer),
    getItem: getItem(api.read)(api.namer),
    removeItem: removeItem(api.remove)(api.namer),
    getAllKeys: getAllKeys(api.read)(api.namer),
  }

}

const setItem = write=> filename => (key,value)=>{
  return new Promise((resolve,reject)=>{
    try{
      write(filename(key),value,'utf8')
      resolve();
    }catch(err){
      reject(err)
    }

  })
}

const getItem = read=> filename =>  key =>{
  return new Promise((resolve,reject)=>{
    try{
      let data= read(filename(key), 'utf8')
      resolve(data)
    }catch(err){
      reject(err)
    }
  })
}

const removeItem = remove=> filename =>  key => {
  return new Promise((resolve,reject)=>{
    try{
      remove(filename(key));
      resolve();
    }catch(err){
      reject(err)
    }
  })
}
/*I'm not even sure this is required... */
const getAllKeys = read=> filename =>  ()=>{
  return new Promise((resolve,reject)=>{
    try{
      let content = read(filename(key), 'utf8');
      resolve(object.keys(JSON.parse(content)));

    }catch(err){
      reject(err)
    }
  })
}
