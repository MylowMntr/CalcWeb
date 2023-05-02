import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calculation } from './calculation.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Calculation)
    private readonly calculationRepository: Repository<Calculation>,
  ) {}

  async createCalculation(
    expression: string,
    result: number,
    duration: number,
  ): Promise<void> {
    const calculation = new Calculation();
    calculation.expression = expression;
    calculation.result = result;
    calculation.duration = duration;
    await this.calculationRepository.save(calculation);
  }

  async countInvalidCalculations(): Promise<number> {
    return await this.calculationRepository.count({
      where: {
        result: null,
      },
    });
  }

  async getPreviousInvalidCalculationDate(): Promise<Date> {
    const calculation = await this.calculationRepository.findOne({
      where: {
        result: null,
      },
      order: {
        created_at: 'DESC',
      },
    });
    if (calculation) {
      return calculation.created_at;
    } else {
      return null;
    }
  }

  async getCalculationsStats(): Promise<any> {
    const [validCalculations, invalidCalculations, previousInvalidCalculationDate] = await Promise.all([
      this.calculationRepository.query(`
        SELECT COUNT(*) as count, AVG(duration) as averageDuration FROM calculation WHERE result IS NOT NULL
      `),
      this.calculationRepository.query(`
        SELECT COUNT(*) as count FROM calculation WHERE result IS NULL
      `),
      this.getPreviousInvalidCalculationDate(),
    ]);
  
    let percentageFasterThanMe = null;
    let averageDuration = null;
    if (validCalculations[0].count > 0) {
      averageDuration = validCalculations[0].averageDuration;
      const result = await this.calculationRepository.query(`
        SELECT COUNT(*) as count FROM calculation WHERE result IS NOT NULL AND duration < ${averageDuration}
      `);
      percentageFasterThanMe = (result[0].count / validCalculations[0].count) || 0;
    }
  
    return {
      percentageFasterThanMe,
      averageDuration,
      invalidCalculationsCount: invalidCalculations[0].count,
      previousInvalidCalculationDate: previousInvalidCalculationDate,
    };
  }

  async getAllCalculations(): Promise<any> {
    return await this.calculationRepository.find();
  }
}
