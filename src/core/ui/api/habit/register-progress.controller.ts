import { Body, Controller, Post, Res } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { Response } from 'express'
import { catchError } from '../error.handler'
import { RegisterProgressCommandHandler } from '../../../application/habit/register-progress/register-progress.command-handler'
import { RegisterProgressCommand } from '../../../application/habit/register-progress/register-progress.command'

export class RegisterProgressDto {
  habitId: string
  date: Date
  observations: string
  validated: boolean
}

@Controller()
export class RegisterProgressController {
  constructor(private commandHandler: RegisterProgressCommandHandler) {}

  @Post('habits')
  handle(@Body() request: RegisterProgressDto, @Res() response: Response) {
    const id = uuidv4()

    // We can remove this try/catch using a NestJS decorator
    try {
      this.commandHandler.handle(
        new RegisterProgressCommand({
          id: id,
          habitId: request.habitId,
          date: request.date,
          observations: request.observations,
          validated: request.validated,
        }),
      )
    } catch (error) {
      catchError(error, response)
      return
    }

    response.set('Location', `/habits/${id}`).send()
  }
}
