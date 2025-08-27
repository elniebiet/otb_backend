import { ConflictException, Injectable, InternalServerErrorException, NotFoundException,
    UnauthorizedException
 } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveSettingsDTO, SettingsQueryDTO, SettingsResponseDTO } from './dto/general-settings.dto';
import { Repository } from 'typeorm';
import { OTB_Settings } from './settings.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GeneralService {
    constructor(
        @InjectRepository(OTB_Settings)
        private settingsRepository: Repository<OTB_Settings>,
        private authService: AuthService,
    ){}

    async loadSettings(settingsDTO: SettingsQueryDTO): Promise<{statusCode: number, settings: SettingsResponseDTO}> {
        const { email, accessToken } = settingsDTO;
        if(accessToken.length > 0)
        {
            try {
                // verify access token
                const verifyResult = await this.authService.VerifyAccessToken({ email, accessToken });
                if (verifyResult.valid === 1) {
                    const settings = await this.settingsRepository.findOne({ where: { email } });
                    if (settings) {
                        return {
                            statusCode: 200,
                            settings: {
                                color_theme: settings.color_theme,
                                toolbar_orientation: settings.toolbar_orientation,
                                show_tips: settings.show_tips,
                            }
                        };
                    }
                }
                else
                {
                    const settings: SettingsResponseDTO = {
                        color_theme: "",
                        toolbar_orientation: 0,
                        show_tips: 0,
                    };

                    throw new UnauthorizedException(settings);
                }
            } catch (error) {
                // invalid access token
            }
        }

        const settings: SettingsResponseDTO = {
            color_theme: "",
            toolbar_orientation: 0,
            show_tips: 0,
        };

        throw new NotFoundException(settings);
    }

    async saveSettings(settingsDTO: SaveSettingsDTO & { email: string, accessToken: string }): Promise<{statusCode: number, message: string}> {
        const { email, accessToken, color_theme, toolbar_orientation, show_tips } = settingsDTO;

        console.log('Received settings to save:', settingsDTO);

        // verify access token
        const verifyResult = await this.authService.VerifyAccessToken({ email, accessToken });
        if (verifyResult.valid !== 1) {
            throw new UnauthorizedException("Invalid access token");
        }

        let settings = await this.settingsRepository.findOne({ where: { email } });
        if (!settings) {
            settings = this.settingsRepository.create({ email, color_theme, toolbar_orientation, show_tips });
        } else {
            settings.color_theme = color_theme;
            settings.toolbar_orientation = toolbar_orientation;
            settings.show_tips = show_tips;
        }

        try {
            await this.settingsRepository.save(settings);
            return { statusCode: 200, message: "Settings saved successfully" };
        } catch (error) {
            console.log('Error saving settings:', error);
            throw new InternalServerErrorException("Error saving settings");
        }
    }
}