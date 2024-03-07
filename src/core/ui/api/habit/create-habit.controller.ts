import { CreateHabitCommandHandler } from '../../../application/habit/create-habit.command-handler'
import { Body, Controller, Post, Res } from '@nestjs/common'
import { CreateHabitCommand } from '../../../application/habit/create-habit.command'
import { v4 as uuidv4 } from 'uuid'
import { Response } from 'express'
import { catchError } from '../error.handler'

export class CreateHabitDto {
  userId: string
  name: string
  frequencyType: string
  estimatedTime: number
  minRestTime: number
}

@Controller()
export class CreateHabitController {
  constructor(private commandHandler: CreateHabitCommandHandler) {}

  @Post('habits')
  handle(@Body() request: CreateHabitDto, @Res() response: Response) {
    const id = uuidv4()

    // We can remove this try/catch using a NestJS decorator
    try {
      this.commandHandler.handle(
        new CreateHabitCommand({
          id: id,
          userId: request.userId,
          name: request.name,
          frequencyType: request.frequencyType,
          estimatedTime: request.estimatedTime,
          minRestTime: request.minRestTime,
        }),
      )
    } catch (error) {
      catchError(error, response)
      return
    }

    response.set('Location', `/habits/${id}`).send()
  }
}
