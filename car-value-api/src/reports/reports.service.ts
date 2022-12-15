import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from '../reports/dtos/create-report.dto';
import { Report } from './reports.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    // This sets up the association in the DB
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!report) {
      throw new NotFoundException(`Report ${id} not found.`);
    }
    report.approved = approved;
    return this.repo.save(report);
  }

  async createEstimate({
    make,
    model,
    long,
    lat,
    year,
    mileage,
  }: GetEstimateDto) {
    return (
      this.repo
        .createQueryBuilder()
        // gets the average price of the max 3 reports we query for
        .select('AVG(price)', 'price')
        .where('make = :make', { make })
        .andWhere('model = :model', { model })
        // + or - 5 degrees of current long being passed in
        .andWhere('long - :long BETWEEN -5 AND 5', { long })
        .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
        // + or - 3 years of current year being passed in
        .andWhere('year - :year BETWEEN -3 AND 3', { year })
        // absolute value of mileage being passed in
        .orderBy('ABS(mileage = :mileage)', 'DESC')
        .setParameters({ mileage })
        .limit(3)
        .getRawOne()
    );
  }
}
