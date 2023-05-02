import { Controller, Get, Res } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('calculate')
  async calculate(
    @Body('expression') expression: string,
    @Body('time') durations: string,
  ): Promise<void> {
    let result = eval(expression);
    let duration : number = +durations;
    await this.appService.createCalculation(expression, result, duration);
    return result;
  }

  @Get('stats')
  async getStats(): Promise<any> {
    return this.appService.getCalculationsStats();
  }

  @Get('/calculations')
  async getAllCalculations(): Promise<any> {
    return await this.appService.getAllCalculations();
  }

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

  // @Post('calculate')
  // calculate(@Body() data: any): number {
  //   const expression = data.expression;
  //   const result = eval(expression);
  //   return result;
  // }


  private timer: NodeJS.Timeout = null;
  private milliseconds = 0;

  @Post('timer/start')
  startTimer(): string {
    if (!this.timer) {
      this.timer = setInterval(() => {
        // Le setInterval est appelé toutes les 1ms, mais le callback est exécuté toutes les 10ms donc on incrémente de 10
        this.milliseconds+=10;

        // console.log(`Temps écoulé : ${this.milliseconds} ms`);
      }, 1);
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
      const elapsedSeconds = this.milliseconds;
      this.milliseconds = 0;

      console.log( `Timer arrêté. Temps écoulé : ${elapsedSeconds} ms.`)
      return `${elapsedSeconds}`;
    } else {
      return 'Le timer n\'est pas en cours';
    }
  }
}