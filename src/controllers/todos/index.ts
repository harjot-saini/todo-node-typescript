import { Request, Response } from 'express'
import { ITodo } from '../../types/todo'
import Todo from '../../models/todo'
import mongoose from 'mongoose'

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find()
    res.status(200).json({ todos })
  } catch (error) {
    throw error
  }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, 'name' | 'description' | 'status' |'priority'>
    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
      priority:body.priority,
    })

    const newTodo: ITodo = await todo.save()
    const allTodos: ITodo[] = await Todo.find()

    res
      .status(201)
      .json({ message: 'Todo Added', todo: newTodo, todos: allTodos })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req

    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    )

    const allTodos: ITodo[] = await Todo.find()

    res.status(200).json({
      message: 'Todo updated',
      todo: updateTodo,
      todos: allTodos,
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(req.params.id) })

    const allTodos: ITodo[] = await Todo.find()
    res.status(200).json({
      message: 'Todo deleted',
      todo: deletedTodo,
      todos: allTodos,
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { getTodos, addTodo, updateTodo, deleteTodo }
