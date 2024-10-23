import {useState, useEffect} from 'react';

function App() {

  const [createToDo, setCreateToDo] = useState(false);
  const [value, setValue] = useState('');

  const getToDoTask = () => {
    const todoStorage = JSON.parse(localStorage.getItem("todoTaskArray"))
    if(todoStorage) return todoStorage;
    else return [];
  }
  const getDoneTask = () => {
    const doneStorage = JSON.parse(localStorage.getItem("doneTaskArray"))
    if(doneStorage) return doneStorage;
    else return []; 
  }
  const [todoTaskArray, setTodoTaskArray] = useState(getToDoTask());
  const [doneTaskArray, setDoneTaskArray] = useState(getDoneTask());
  useEffect(function(){
    localStorage.setItem('todoTaskArray',JSON.stringify(todoTaskArray));
    localStorage.setItem('doneTaskArray',JSON.stringify(doneTaskArray));
  },[todoTaskArray, doneTaskArray])
 
  function handleClick() {
    setCreateToDo(!createToDo);
  }
  function handleValue(e) {
    setValue(e.target.value);
  }
 
  function handleTodo(){
  if(value == "") return alert("Please enter a Task");
   todoTaskArray.push(value);
  setCreateToDo(!createToDo);
    setValue("");
  }
  function handleTodoTask(e){
    const target = e.target.value;
    const filteredArray = todoTaskArray.filter(function(e) { return e !== target })
    doneTaskArray.push(target)
    setTodoTaskArray(filteredArray);
  }
  function handleDoneTask(e){
    const target = e.target.value;
    const filteredArray = doneTaskArray.filter(function(e) { return e !== target })
    todoTaskArray.push(target)
    setDoneTaskArray(filteredArray);
  }
  function handleAnotherUser(){
    setTodoTaskArray(["Make a todo List for today"]);
    setDoneTaskArray(["Todo created by another user"]);
  }

  return (
   <>
     <div className="min-h-screen">
       <div className="border-b">
     <div className="max-w-7xl h-16 mx-auto flex items-center px-4 lg:px-8">
         <h1 className="text-xl px-2 font-semibold">XoTodo</h1>
     </div>
       </div>
     <div className="py-8 md:flex justify-between space-y-2 max-w-7xl mx-auto px-4 lg:px-8">
       <h2 className="text-3xl font-bold">Things to get done </h2>
       <button className="bg-yellow-500 px-4 py-2 text-white rounded text-sm font-semibold hover:bg-yellow-600" onClick={handleAnotherUser}>Refresh</button>
     </div>
       <div className="max-w-7xl mx-auto px-4 lg:px-8">
         <h4 className="text-lg font-medium">Things to do</h4>
         <ul className="mt-4">
           { todoTaskArray.length==0 && <div className="text-gray-400">No Todo's Here !</div>}
           { todoTaskArray && todoTaskArray.map(function(item){
          return <li className="flex gap-3 items-center mt-2 font-medium text-gray-700 text-sm" key={item}><input className="w-4 h-4 " type="checkbox" onClick={handleTodoTask} value={item}/>{item}</li>
         }
         )}
         </ul>
         {createToDo && 
          <div className="p-4 space-y-4 border-2 rounded my-4 shadow-md">
            <h3 className="text-xl font-semibold">Create a todo</h3>
            <input className="border-2 border-gray-200 rounded w-full p-2" placeholder="Write an Task to add in List" onChange={handleValue}/>
               <button className="bg-yellow-500 px-4 py-2 text-white rounded text-sm font-semibold" onClick={handleTodo}>Save</button>
             <button className="] px-4 py-2 rounded text-sm font-semibold ml-4 border border-gray-400" onClick={handleClick}>Cancel</button>
         </div>}
         { !createToDo && <button className="bg-yellow-500 px-4 py-2 text-white rounded-full mt-4 text-sm font-semibold hover:bg-yellow-600" onClick={handleClick}> + Add a todo</button>}
         <h4 className="text-lg font-semibold mt-4">Things done</h4>
          <ul className="mt-4">
             { doneTaskArray.length==0 && <div className="text-gray-400">No Todo's Here !</div>}
            { doneTaskArray && doneTaskArray.map(function(item){
              return <li className="flex gap-3 items-center mt-1 font-medium text-gray-700 text-sm" key={item}><input className="w-4 h-4 " type="checkbox" checked onChange={handleDoneTask} value={item}/>{item}</li>
             }
             )}    
          </ul>
       </div>
    </div>
   </>
  );
}

export default App;
