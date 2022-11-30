import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages[id];
  }
  async findAll() {
    const contents = await readFile('messages.json', 'utf8');
    return JSON.parse(contents);
  }
  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    const id = uuid();
    messages[id] = { id, content };

    await writeFile('messages.json', JSON.stringify(messages));
  }
}
