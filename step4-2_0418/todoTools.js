//const uuidv1 = require('uuid/v1')
const fs = require('fs')
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// bootstrap
var data = fs.readFileSync('./todos.json')
var todos = JSON.parse(data)

module.exports.input = (query) => {
  return new Promise((resolve, reject) => {
    rl.question(query, (answer) => {
      resolve(answer)
    })
  })
}

// help operations
const createId = (name) => {
  let charCode = 0
  let timeNow = new Date().getTime()
  for(let i =0;i<name.length;i++){
    charCode += name.charCodeAt(i)
  }
  const uniqueId = charCode + timeNow
  return uniqueId
}

// operations(add, update, delete, show)
module.exports.show = (objStr) => {
  let todoSum = todos.filter(v => v.status === 'todo').length
  let doingSum = todos.filter(v => v.status === 'doing').length
  let doneSum = todos.length - todoSum - doingSum
	
  const props = {'todo' : todoSum, 'doing' : doingSum, 'done' : doneSum}
  
  if (objStr === 'all'){
    console.log(`현재상태 : todo: ${todoSum}개, doing: ${doingSum}개, done: ${doneSum}개`)
    return
  }
  result = todos.filter(v => v.status === objStr).map(v => v.name)
  console.log(`${objStr}리스트 : 총${props[objStr]}건 : ${result.reduce((acc, cur)=> acc + ', ' + cur)}`)

  return 
}

module.exports.add = async (name, tags) => {
  tags = JSON.parse(tags)
  uniqueId = createId(name)
  todos.push({'name' : name, 'tags': tags, 'status': 'todo', 'id': uniqueId})
  console.log(`${name} 1개가 추가됐습니다. (id : ${uniqueId})`)
  setTimeout(() => {this.show('all')}, 3000)
}

module.exports.update = (id, status) => {

}

module.exports.delete = (id) => {
  let idx = 0;
  let deleteObj = {};
  todos.filter((v, i) => {
    if(Number(id) === v.id) {
      idx = i;
      deleteObj = v;
    }  
  })

  if(idx > -1) {
    todos.splice(idx, 1);
  }
  
  console.log(`${deleteObj['name']} ${deleteObj['status']}가 목록에서 삭제됐습니다`);
  
}




// terminate program
module.exports.shutdownRl = async () => {
  await rl.close()
  return
}
module.exports.saveFile = async () => {
  todos = JSON.stringify(todos)
  fs.writeFileSync("todos.json" ,todos)
}