let fun1 = () =>{
    setTimeout(function(){
        console.log("fun1");
    },3000);
}
 let fun2 = () => {
    setTimeout(function(){
        console.log("fun2");
    },1000);
}
let fun_array  = [
    fun1,
    fun2
];
async function f() {
    let promise1 = new Promise((resolve, reject) => {
      resolve(fun1())
    });
    let promise2 = new Promise((resolve, reject) => {
      resolve(fun2())
    });
  
    let result1 = await promise1; // wait till the promise resolves (*)
    let result2 = await promise2; // wait till the promise resolves (*)
}
f();