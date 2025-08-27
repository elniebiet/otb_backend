import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SettingsResponseDTO, SettingsQueryDTO, SaveSettingsDTO } from './dto/general-settings.dto';
import { GeneralService } from './otb_general.service';

@Controller('general')
export class GeneralController {
    constructor(private authService: AuthService, private generalService: GeneralService) {}

    @Post('/load_settings')
    getSettings(
        @Body() settingsQueryDTO: SettingsQueryDTO
    ): Promise<{statusCode: number, settings: SettingsResponseDTO}> {
        return this.generalService.loadSettings(settingsQueryDTO);
    }

    @Post('/save_settings')
    saveSettings(@Body() saveSettingsDTO: SaveSettingsDTO): Promise<{statusCode: number, message: string}> {
        return this.generalService.saveSettings(saveSettingsDTO);
    }
}
