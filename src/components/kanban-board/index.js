import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    // { name: '1', stage: 0 },
    // { name: '2', stage: 0 },
    this.state = {
      tasks: [],
      newTask:''
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.onchange = this.onchange.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
  }

  // Function to collect the new task from the input onchange
  onchange(e){
    let value = e.target.value;
    this.setState({newTask:value})
  }
  // Function to add new task to tasks state array
  addNewTask(){
    if(this.state.newTask){
      this.setState({tasks:[...this.state.tasks,{name:this.state.newTask,stage:0}]});
      this.setState({newTask:''});
    }
  }
  
  // Function to elevate the task stage
  elevateStage(){
    
  }
  // Function to lower the task stage





  render() {
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input value={this.state.newTask} onChange={(e)=>{this.onchange(e)}} id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input"/>
          <button onClick={this.addNewTask} type="submit" className="ml-30" data-testid="create-task-button">Create task</button>
        </section>

        <div className="mt-50 layout-row">
            {stagesTasks.map((tasks, i) => {
                return (
                    <div className="card outlined ml-20 mt-0" key={`${i}`}>
                        <div className="card-text">
                            <h4>{this.stagesNames[i]}</h4>
                            <ul className="styled mt-50" data-testid={`stage-${i}`}>
                                {tasks.map((task, index) => {
                                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                      <div className="li-content layout-row justify-content-between align-items-center">
                                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                        <div className="icons">
                                          <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`} disabled={task.stage === 0?true:false}>
                                            <i className="material-icons">arrow_back</i>
                                          </button>
                                          <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`} disabled={task.stage === 3?true:false}>
                                            <i className="material-icons">arrow_forward</i>
                                          </button>
                                          <button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`}>
                                            <i className="material-icons">delete</i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
}