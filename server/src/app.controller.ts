import { Controller, Get, Res } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  @Get()
  root(@Res() res: Response): void {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  }

  @Get('/script.js')
  getScript(@Res() res: Response) {
    res.sendFile(path.join(__dirname, '../../public/script.js'));
  }

  @Get('/style.css')
  getStyles(@Res() res: Response) {
    res.sendFile(path.join(__dirname, '../../public/style.css'));
  }  

  @Post('calculate')
  calculate(@Body() data: any): number {
    const expression = data.expression;
    const result = eval(expression);
    return result;
  }


  private timer: NodeJS.Timeout = null;
  private seconds = 0;

  @Post('timer/start')
  startTimer(): string {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.seconds++;
        console.log(`Temps écoulé : ${this.seconds} secondes`);
      }, 1000);
      return 'Timer démarré';
    } 
    // else {
    //   return 'Le timer est déjà en cours';
    // }
  }

  @Post('timer/stop')
  stopTimer(): string {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      const elapsedSeconds = this.seconds;
      this.seconds = 0;
      return `Timer arrêté. Temps écoulé : ${elapsedSeconds} secondes.`;
    } else {
      return 'Le timer n\'est pas en cours';
    }
  }
}