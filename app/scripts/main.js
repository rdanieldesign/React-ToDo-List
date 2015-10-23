var React = require('react');
var ReactDOM = require('react-dom');

// Mock Data
var data = [
  {
    id: 0,
    title: "First Title",
    copy: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 1,
    title: "Second Title",
    copy: "Test description."
  },
  {
    id: 2,
    title: "Third Title",
    copy: "Lorem ipsum dolor sit amet."
  },
];

var ToDoInterface = React.createClass({
  getInitialState: function(){
    return { data: data };
  },
  render: function(){
    return (
      <section className="toDoInterface">
        <h1>ToDo List</h1>
        <ToDoList data={this.state.data}/>
        <AddForm addEntry={this.addToList}/>
      </section>
    );
  },
  addToList: function(newEntry){
    data.push(newEntry);
    this.setState({ data: data });
  }
});

var ToDoList = React.createClass({
  getInitialState: function(){
    return { items: this.props.data }
  },
  render: function(){
    var self = this;
    var list = this.state.items.map(function (item, i) {
      return (
        <ListItem title={ item.title } copy={ item.copy } key={ i } _id={ item.id } removeItem={ self.removeItem }/>
      );
    });
    return (
      <ul className="toDoList">
        { list }
      </ul>
    );
  },
  removeItem: function(key){
    data.forEach(function(item, i){
      if(item.id === key){
        data.splice(i, 1);
      }
    });
    this.setState({ data: data })
  }
});

var ListItem = React.createClass({
  render: function(){
    return (
      <li className="listItem" key={ this.props.key } id={ this.props._id }>
          <h5> { this.props.title } </h5>
          <p> { this.props.copy } </p>
          <RemoveButton removeItem={ this.deleteItem } />
      </li>
    );
  },
  deleteItem: function(){
    this.props.removeItem(this.props._id);
  }
});

var RemoveButton = React.createClass({
  render: function(){
    return (
      <button className="removeButton" onClick={ this.clickHandler }> X </button>
    );
  },
  clickHandler: function(){
    this.props.removeItem();
  }
});

var AddForm = React.createClass({
  render: function(){
    return (
      <form className="addForm" onSubmit={this.submitForm}>
        <label> Title </label>
        <input id="title" ref="title"></input>
        <label> Copy </label>
        <input id="copy" ref="copy"></input>
        <button type="submit">Submit</button>
      </form>
    );
  },
  submitForm: function(e){
    e.preventDefault();
    var newEntry = {
      title: this.refs.title.value,
      copy: this.refs.copy.value
    };
    this.props.addEntry(newEntry);

    // Clear fields on submit
    this.refs.title.value = '';
    this.refs.copy.value = '';
  }
});

// Inject ToDoList into DOM
ReactDOM.render(
  <ToDoInterface />,
  document.getElementById('content')
);
