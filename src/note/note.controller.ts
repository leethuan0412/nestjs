import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';
import { NoteService } from './note.service';
import { CreateNote, UpDateNote } from './validate/create.note.dto';

@UseGuards(MyJwtGuard) // co token moi dc viet note
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  getNote(@GetUser('id') userId: number) {
    return this.noteService.getNote(userId);
  }

  @Get(':id')
  getNoteById(@Param('id') noteId: number) {
    return this.noteService.getNoteById(noteId);
  }

  @Post('/createNote')
  createNote(@GetUser('id') userId: number, @Body() createNote: CreateNote) {
    console.log(userId);

    return this.noteService.createNote(userId, createNote);
  }

  @Patch(':id')
  updateNoteById(
    @Param('id', ParseIntPipe) noteId: number,
    @Body() updateNote: UpDateNote,
  ) {
    return this.noteService.updateNoteById(noteId, updateNote);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteNoteById(@Query('id', ParseIntPipe) noteId: number) {
    return this.noteService.deleteNoteById(noteId);
  }
}
