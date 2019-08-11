const fs = require ('fs')
const path = require ('path')

const default_filenamer=  _options => name => { return path.join(_options.storage_dir,name)}


export makeStorage= filenamer=> options => {

  let _options = configureStorage(options);

  filenamer = filenamer(_options);

  return {
    setItem: setItem(filenamer),
    getItem: getItem(filenamer),
    removeItem: removeItem(filenamer),
    getAllKeys: getAllKeys(filenamer),
  }

}

export default makeStorage(default_filenamer)


const configureStorage = options  =>{
  if(typeof options !=='object'){
    throw new Error('options must be an object')
  }
  if(typeof options.storage_dir !== 'string' || options.storage_dir ===''){
    throw new Error ('storage_dir must be set');
  }

  if (!fs.existsSync(options.storage_dir)){
    fs.mkdirSync(options.storage_dir,{recursive:true});
  }


  return options;
}



const setItem = filename => (key,value)=>{
  console.log('setItem',key,typeof(value))

  return new Promise((resolve,reject)=>{
    try{
      fs.writeFileSync(filename(key),value,'utf8')
      resolve();
    }catch(err){
      reject(err)
    }

  })
}

const getItem = filename =>  key =>{
  return new Promise((resolve,reject)=>{
    try{
      let data= fs.readFileSync(filename(key), 'utf8')
      resolve(data)
    }catch(err){
      reject(err)
    }
  })
}

const removeItem = filename =>  key => {
  return new Promise((resolve,reject)=>{
    try{
      return fs.unlinkSync(filename(key));
      resolve();
    }catch(err){
      reject(err)
    }
  })
}
/*I'm not even sure this is required... */
const getAllKeys = filename =>  ()=>{
  return new Promise((resolve,reject)=>{
    try{
      let content = fs.readFileSync(filename(key), 'utf8');
      resolve(object.keys(JSON.parse(content)));

    }catch(err){
      reject(err)
    }
  })
}
