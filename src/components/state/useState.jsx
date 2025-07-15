import { useState as learnUseState } from 'react';
import Image from '../../../public/line.png'
import React from 'react';

const useState = () => {
    const [preview, setPreview] = learnUseState('Stepper');
    const learnList = [
        { name: "TodoList", component: <TodoList /> },
        { name: "Stepper", component: <Stepper /> }
    ]
    function setPrev(pre) {
        if (preview === pre) {
            setPreview('none')
        } else {
            setPreview(pre)
        }
    }
    return (<div>
        <h1>
            <code>useState Hook</code>
            <hr />
        </h1>
        {learnList.map((data, index) => (
            <div key={index}>
                <button onClick={() => setPrev(data.name)} className='border-0'>{data.name}</button>
                <div>
                    {preview === data.name && data.component}
                </div>
                <hr />
            </div>
        ))}
    </div>)
}

function Stepper() {
  const [step, setStep] = learnUseState(0);

  const steps = [1, 2, 3];

  return (
    <div className="mt-3" style={{ maxWidth: "300px" }}>
      <div className="d-flex justify-content-between align-items-center container">
        {steps.map((num, index) => (
          <React.Fragment key={index}>
            <button
              className={`border-0 rounded-5 p-3 d-flex justify-content-center align-items-center ${step === index ? 'active' : ''}`}
              style={{ width: '50px', height: '50px' }}
              onClick={() => setStep(index)}

            >
              {num}
            </button>
            {index !== steps.length - 1 && (
              <span style={{ width: "70%" }}>
                <img src={Image} style={{ height: "50px", width: '100%' }} alt="line" />
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="m-3 p-2" style={{ backgroundColor: 'rgb(243, 242, 242)' }}>
        {`Page ${step + 1}`}
      </div>
    </div>
  );
}












export default useState;













































function TodoList() {
    const [task, setTask] = learnUseState({
        title: "",
        description: "",
        isCompleted: false
    })
    const [tasks, setTasks] = learnUseState([]);
    const [update, setUpdate] = learnUseState(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setTask((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        // validation
        if (task.title === "" || task.title.length < 5) {
            return alert('Task title length must be greater than 5 character')
        }

        if (task.description === "" || task.description.length < 10) {
            return alert("Description length must be 10 character long")
        }

        setTasks(prev => [...prev, task]);
        setTask({
            title: "",
            description: "",
            isCompleted: false
        })
    }

    function handleUpdate(index) {
        setTask(tasks[index]);
        setUpdate(index);
    }

    function updateTask() {
        const updatedTasks = [...tasks];
        updatedTasks[update] = task;
        setTasks(updatedTasks);
        setUpdate(null); // clear edit mode
        setTask({
            title: "",
            description: "",
            isCompleted: false
        });
    }

    return (<div>
        <h2 className="text-muted">
            1. Todo List
        </h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter your task' name='title' className='m-2' onChange={handleChange} value={task.title} />
            <input type="description" placeholder='Enter Description' name='description' className='m-2' onChange={handleChange} value={task.description} />
            {update === null && <button type='submit'>Submit</button>}
            {update !== null && <button type='button' onClick={updateTask}>Update</button>}

        </form>
        <RenderTask tasks={tasks} handleUpdate={handleUpdate} />
    </div>)
}

function RenderTask({ tasks, handleUpdate }) {
    return (<div>
        {tasks && tasks.map((data, index) => (
            <div style={{ width: '400px' }} className='mt-3' key={index}>
                <div className='d-flex justify-content-between align-items-center' >
                    <h3>{data.title}</h3>
                    <button onClick={() => handleUpdate(index)}>
                        Edit
                    </button>
                </div>
                <p>{data.description}</p>
                <span>{data.isCompleted === true ? "Completed" : "Not Completed"}</span>
            </div>
        ))}
    </div>)
}
