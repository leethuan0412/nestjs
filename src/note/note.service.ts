import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNote, UpDateNote } from './validate/create.note.dto';

@Injectable({})
export class NoteService {
  constructor(private prismaService: PrismaService) {}
  getNote(userId: number) {
    const notes = this.prismaService.note.findMany({
      where: {
        userId: userId,
      },
    });
    return notes;
  }

  getNoteById(noteId: number) {
    return this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
  }

  async createNote(userId: number, createNote: CreateNote) {
    const note = await this.prismaService.note.create({
      data: {
        userId: userId,
        title: createNote.title,
        description: createNote.description,
        url: createNote.url,
      },
    });
    return note;
  }

  updateNoteById(noteId: number, updateNote: UpDateNote) {
    const note = this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new ForbiddenException('Cannot find note');
    }
    return this.prismaService.note.update({
      data: { ...updateNote },
      where: {
        id: noteId,
      },
    });
  }

  deleteNoteById(noteId: number) {
    const note = this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new ForbiddenException('Cannot find note');
    }
    return this.prismaService.note.delete({
      where: {
        id: noteId,
      },
    });
  }
}
