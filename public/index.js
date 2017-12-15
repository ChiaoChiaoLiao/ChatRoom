class TodoItem extends React.Component {
    render() {
        return (<li key={this.props.key}>{this.props.children}</li>);
    }
}

class TodoItems extends React.Component {
    render() {
        var displayItems = this.props.items.map(function (item) {
            // return (<li key={item.id}>{item.data}</li>);
            return (<TodoItem key={item.id}>{item.data}</TodoItem>);
        });
        return (
            <div>
                <ul>{displayItems}</ul>
            </div>
        );
    }
}

class AddTodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todoText: ""};
        this.handleTodoChange = this.handleTodoChange.bind(this);
        this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    }
    handleTodoChange(e) {
        this.setState({todoText: e.target.value});
    }
    handleAddTodoItem() {
        // console.log(this.state.todoText);
        // 如何將資料新增到TodoItems中?
        // 呼叫以props傳進來的addItem
        this.props.addItem(this.state.todoText);
    }
    render() {
        return (
            <div>
                <input type="text"
                       value={this.state.todoText}
                       onChange={this.handleTodoChange}/>
                <button
                    onClick={this.handleAddTodoItem}>Add Todo Item</button>
            </div>
        );
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
        this.state = {
            todoItems: [
                {id: 1, data: "Item 1"},
                {id: 2, data: "Item 2"}
            ]
        }
    }
    handleAddTodoItem(todoText) {
        var items = this.state.todoItems;
        items.push({
            id: items.length + 1,
            data: todoText
        });
        this.setState({todoItems: items});
    }
    render() {
        return(
            <div className="todoList">
                <h1>Todo List</h1>
                <TodoItems items={this.state.todoItems}/>
                <AddTodoForm addItem={this.handleAddTodoItem}/>
            </div>
        );
    }
}

ReactDOM.render(
    <TodoList />,
    document.getElementById("root")
);