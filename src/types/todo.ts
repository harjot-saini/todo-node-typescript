import { Document } from 'mongoose'

export interface ITodo extends Document {
  name: string
  desciption: string
  status: boolean
}
