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
    render() {
        return (
            <div>我用來增加TodoItem</div>
        );
    }
}

class TodoList extends React.Component {
    render() {
        var todoItems = [
            {id: 1, data: "Item 1"},
            {id: 2, data: "Item 2"}
        ];
        return(
            <div className="todoList">
                <h1>我是一個TodoList容器</h1>
                <h2>我組合了TodoItems以及AddTodoForm兩個元件</h2>
                <TodoItems items={todoItems}/>
                <AddTodoForm />
            </div>
        );
    }
}

ReactDOM.render(
    <TodoList />,
    document.getElementById("root")
);