import React, {Component} from "react";
import {StyleSheet, Text, View, TextInput, Button} from "react-native";
import * as todoActions from "todo-kernel/client/actions/todosActions";
import {connect} from "react-redux";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {text:""};
  }

  componentWillMount() {
    this.props.dispatch(todoActions.fetchTodos())
  }

  addClickHandler = () => {
    if(this.state.text.trim() === "") return;
    this.props.dispatch(todoActions.addTodo({content: this.state.text}));
    this.setState({text: ""})
  };

  removeClickHandler = (id) => {
    this.props.dispatch(todoActions.completeTodo({id}));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Number of TodoItems is {this.props.todos.size}
        </Text>
        {this.props.todos.toArray().map(item=> {
          return (
            <Text
              onPress={this.removeClickHandler.bind(this,item.get('id'))}
              key={item.get('id')}
              style={styles.instructions}
            >
              {item.get('content')}
            </Text>
          )
        })}
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          onPress={this.addClickHandler}
          title="Add"
          color="#841584"
          accessibilityLabel="Add a new todo item to the list"
        />
        <Text style={styles.instructions}>
          Click item to remove.
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

export default connect(state => ({todos: state.todos}))(App)