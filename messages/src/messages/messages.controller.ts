import { CreateMessageDto } from './dtos/create-message.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('/messages')
export class MessagesController {
  @Get()
  listMessages() {}

  @Post()
  createMessage(@Body() body:CreateMessageDto) {
    console.log(body)
  }

  @Get('/:id')
  getMessage(@Param('id') id:string) {
    console.log(id)
  }
}
