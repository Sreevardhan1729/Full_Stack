/* Arrays */
// const arr = [1,-1,5]
// console.log(arr.length)
// arr.push(4)
// console.log(arr.length)
// console.log(arr)
// arr.forEach(value => {
//     console.log(value)
// })
// const m = arr.map( value => "<li>" + value*2 + "<li/>")
// console.log(m)
// const [first, second, ...rest] = arr
// console.log(first)
// console.log(rest)


/* Objects */
const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
  }
  
const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
}
  
const object3 = {
    name: {
      first: 'Dan',
      last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    department: 'Stanford University',
}
console.log(object1["name"])
console.log(object1.name)
object1.age = 40
console.log(object1.age)
object1["new col"] = "i am new"

