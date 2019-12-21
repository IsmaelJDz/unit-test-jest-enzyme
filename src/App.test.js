import React from 'react';
import { render } from '@testing-library/react';
import App, {Todo, TodoForm, useTodos} from './App';
//import { unmountComponentAtNode } from 'react-dom';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { func } from 'prop-types';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

configure({ adapter : new Adapter() })

describe('App', () => {
  describe('Todo', () => {
    it ('ejecuta completeTodo cuando doy click en complete', () => {
      //Creat mock de completeTodo
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isCompleted: true,
        text: 'lala'
      }

      const wrapper = shallow(<Todo 
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        index={index}
        todo={todo}
      />)

      wrapper.find('button').at(0).simulate('click');
      
      expect(completeTodo.mock.calls).toEqual([[5]])
      expect(removeTodo.mock.calls).toEqual([]);

    })

    it ('ejecuta removeTodo cuando doy click sobre la x', () => {
      //Creat mock de completeTodo
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isCompleted: true,
        text: 'lala'
      }

      const wrapper = shallow(<Todo 
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        index={index}
        todo={todo}
      />)

      wrapper.find('button').at(1).simulate('click');
      
      expect(completeTodo.mock.calls).toEqual([])
      expect(removeTodo.mock.calls).toEqual([[5]])

    })
  })

  //Testear TodoForm
  describe('TodoForm', () => {
    it('llmar a addTodo cuando el formulario tiene un valor', () => {
      const addTodo = jest.fn();
      const prevent = jest.fn();
      const wrapper = shallow(<TodoForm 
        addTodo={addTodo}
      />)
      wrapper.find('input').simulate('change', {target: { value: 'mi nuevo todo!' }})
      wrapper.find('form').simulate('submit', { preventDefault: prevent })

      expect(addTodo.mock.calls).toEqual([[ 'mi nuevo todo!' ]])
      expect(prevent.mock.calls).toEqual([[]])
    })
  })

  describe('custom hook: useTodos', () => {
    it('addTodo', () => {
      const Test = (props) => {
        const hooks = props.hook()
        return <div {...hooks}></div>
      }
      const wrapper = shallow(<Test hook={useTodos} />)
      let props = wrapper.find('div').props()
      props.addTodo('texto de prueba')
      props = wrapper.find('div').props()
      expect(props.todos[0]).toEqual({ text : 'texto de prueba' })
    })
    it('completeTodo', () => {
      const Test = (props) => {
        const hooks = props.hook()
        return <div {...hooks}></div>
      }
      const wrapper = shallow(<Test hook={useTodos} />)
      let props = wrapper.find('div').props()
      props.completeTodo(0)
      props = wrapper.find('div').props()
      expect(props.todos[0]).toEqual({ text : 'Todo 1', isCompleted: true })
    })
    it('removeTodo', () => {
      const Test = (props) => {
        const hooks = props.hook()
        return <div {...hooks}></div>
      }
      const wrapper = shallow(<Test hook={useTodos} />)
      let props = wrapper.find('div').props()
      props.removeTodo(0)
      props = wrapper.find('div').props()
      expect(props.todos).toEqual([
        {
          text: "Todo 2",
          isCompleted: false
        },
        {
          text: "Todo 3",
          isCompleted: false
        }
      ])
    })
    it('App', () => {
      const wrapper = mount(<App />)
      const prevent = jest.fn()
      wrapper.find('input').simulate('change', { target: { value: "mi todo!" } })
      wrapper.find('form').simulate('submit', {preventDefault: prevent} )
      const respuesta = wrapper.find('.todo').at(0).text().includes('mi todo!')
      expect(respuesta).toEqual(true)
      expect(prevent.mock.calls).toEqual([[]])
    })
  })
})


