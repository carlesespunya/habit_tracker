import { Body, Controller, Post, Res } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { Response } from 'express'
import { catchError } from '../error.handler'
import { RegisterChallengeCommandHandler } from '../../../application/habit/register-challenge/register-challenge.command-handler'
import { RegisterChallengeCommand } from '../../../application/habit/register-challenge/register-challenge.command'

export class RegisterChallengeDto {
  habitId: string
  description: string
  startDate: Date
  endDate: Date
  goal: number
}

@Controller()
export class RegisterChallengeController {
  constructor(private commandHandler: RegisterChallengeCommandHandler) {}

  @Post('habits')
  handle(@Body() request: RegisterChallengeDto, @Res() response: Response) {
    const id = uuidv4()

    // We can remove this try/catch using a NestJS decorator
    try {
      this.commandHandler.handle(
        new RegisterChallengeCommand({
          id: id,
          habitId: request.habitId,
          description: request.description,
          startDate: request.startDate,
          endDate: request.endDate,
          goal: request.goal,
        }),
      )
    } catch (error) {
      catchError(error, response)
      return
    }

    response.set('Location', `/habits/${id}`).send()
  }
}
