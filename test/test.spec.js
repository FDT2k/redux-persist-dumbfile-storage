
import {nodeStorage} from '../src/index'
import fs from 'fs'
test ("node file storage",(done)=>{

  expect(nodeStorage).toBeInstanceOf(Function)

  let store = nodeStorage({storage_dir:'./test/tmp'})

  expect(fs.existsSync('./test/tmp')).toBe(true)


  store.setItem('hello',JSON.stringify({hello:'world'})).then(()=>{
    expect(fs.existsSync('./test/tmp/hello')).toBe(true)
    return store.getItem('hello')
  }).then((data)=>{
      expect (JSON.parse(data)).toEqual({hello:'world'})
      return store.removeItem('hello')
  }).then(()=>{
    expect(fs.existsSync('./test/tmp/hello')).toBe(false)

    return new Promise ((resolve,reject)=>{
      resolve(fs.rmdirSync('./test/tmp'));
    })

  }).then(()=>{
    expect(fs.existsSync('./test/tmp/')).toBe(false)
    done();
  })

})
