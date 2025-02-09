import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service'; 
import { CreateCountryDto } from './dto/create-country.dto'; 
import { UpdateCountryDto } from './dto/update-country.dto'; 
import { CountryFilters } from './entities/country.entity';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
    constructor(private readonly countryService: CountriesService) { }
    @Post()
    create(
        @Body() dto: CreateCountryDto,
    ) {
        return this.countryService.create(dto);
    }
    @Get()
    findAll(@Query() filters:CountryFilters) {
        return this.countryService.findAll(filters);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.countryService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateCountryDto) {
        return this.countryService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.countryService.remove(id);
    }


}