import { GetUserHabitsQueryHandler } from '../../../application/habit/get-user-habits/get-user-habits.query-handler'
import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import { Param } from '@nestjs/common'
import { catchError } from '../error.handler'
import { GetUserHabitsQuery } from 'src/core/application/habit/get-user-habits/get-user-habits.query'

@Controller()
export class GetUserHabitsController {
  constructor(private queryHandler: GetUserHabitsQueryHandler) {}

  @Get('user/:userId/habits')
  async handle(@Param('userId') userId, @Res() response: Response) {
    try {
      const habits = await this.queryHandler.handle(
        new GetUserHabitsQuery(userId),
      )

      response.json(habits)
    } catch (error) {
      catchError(error, response)
      return
    }
  }
}
