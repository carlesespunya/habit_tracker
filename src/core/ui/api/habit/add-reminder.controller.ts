import { Body, Controller, Post, Res } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { Response } from 'express'
import { catchError } from '../error.handler'
import { AddReminderCommandHandler } from '../../../application/habit/add-reminder/add-reminder.command-hanlder'
import { AddReminderCommand } from '../../../application/habit/add-reminder/add-reminder.command'

export class AddReminderDto {
  habitId: string
  message: string
  status: string
  hour: number
}

@Controller()
export class AddReminderController {
  constructor(private commandHandler: AddReminderCommandHandler) {}

  @Post('habits')
  handle(@Body() request: AddReminderDto, @Res() response: Response) {
    const id = uuidv4()

    // We can remove this try/catch using a NestJS decorator
    try {
      this.commandHandler.handle(
        new AddReminderCommand({
          id: id,
          habitId: request.habitId,
          message: request.message,
          status: request.status,
          hour: request.hour,
        }),
      )
    } catch (error) {
      catchError(error, response)
      return
    }

    response.set('Location', `/habits/${id}`).send()
  }
}
