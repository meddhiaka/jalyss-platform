import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountryProposalsService } from './countryProposal.service';
import { CreateCountryProposalDto } from './dto/create-countryProposal.dto';
import { UpdateCountryProposalDto } from './dto/update-countryProposal.dto';

@ApiTags('Country Proposals')
@Controller('country-porposals/')

export class CountryProposalsController {
  constructor(
    private readonly countryProposalsService: CountryProposalsService,
  ) {}

  @Post()
  create(@Body() dto: CreateCountryProposalDto) {
    return this.countryProposalsService.create(dto);
  }

  @Get()
  findAll() {
    return this.countryProposalsService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.countryProposalsService.findOne(id);
  }

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCountryProposalDto) {
    return this.countryProposalsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryProposalsService.remove(id);
  }
}
