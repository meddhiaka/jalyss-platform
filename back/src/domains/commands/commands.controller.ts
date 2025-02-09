import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { CommandsService } from './commands.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { FilterCommand } from './types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/currentUser';
import { Status } from '@prisma/client';

@ApiTags('commands')
@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}
 
  @Post(':branchId')
  create(
    @Body() createCommandDto: CreateCommandDto,
    @Param('branchId') branchId: string,
  ) {
    return this.commandsService.create(createCommandDto, branchId);
  }

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.commandsService.findAll();
  }


  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Get('/by-user')
  findAllByUserId(@CurrentUser() user: any) {
    return this.commandsService.findAllByUserId(user.clientId);
  }

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Get('by-client/:clientId')
  findAllByclientId(@Param('clientId') id: string) {
    return this.commandsService.findAllByClientId(id);
  }

  @Get(':branchId')
  findAllByBranchId(
    @Param('branchId') branchId: string,
    @Query() filters: FilterCommand,
  ) {
    return this.commandsService.findAllByBranchIdentifier(branchId, filters);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.commandsService.findOne(id);
  }

  @Get('commandLine/all')
  findAllCommanLIne() {
    return this.commandsService.findAllCommandLIne();
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandDto: UpdateCommandDto) {
    return this.commandsService.update(id, updateCommandDto);
  }

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Put('confirm/:id')
  updateConfirmStatus(@Param('id') id: string, @Body() dto: any) {
    return this.commandsService.updateConfirmStatus(id, dto.status);
  }

  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Put('paid/:id')
  updatePaidStatus(@Param('id') id: string, @Body() dto: any) {
    return this.commandsService.updatePaidStatus(id, dto.status);
  }


  @ApiSecurity('apiKey')
  @UseGuards(JwtAuthGuard)
  @Put('delivered/:id')
  updateDeliveredStatus(@Param('id') id: string, @Body() dto: any) {
    return this.commandsService.updateDeliveredStatus(id, dto.status);
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandsService.remove(id);
  }
}
