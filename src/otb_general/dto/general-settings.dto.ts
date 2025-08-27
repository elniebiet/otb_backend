import { Type } from "class-transformer";
import { IsString, MaxLength, MinLength, Matches, IsDate, Min, IsNumber, IsBoolean, Max } from "class-validator";
import { Unique } from "typeorm";

class SettingsQueryDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    email: string;

    @IsString()
    @MinLength(0)
    @MaxLength(500)
    accessToken: string;
}

class SettingsResponseDTO {
    @IsString()
    @MinLength(0)
    @MaxLength(100)
    color_theme: string;
    
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(1)
    toolbar_orientation: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(1)
    show_tips: number;
}

class SaveSettingsDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    email: string;

    @IsString()
    @MinLength(0)
    @MaxLength(500)
    accessToken: string;

    @IsString()
    @MinLength(0)
    @MaxLength(100)
    color_theme: string;
    
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(1)
    toolbar_orientation: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(1)
    show_tips: number;
}

export { 
    SettingsQueryDTO,
    SettingsResponseDTO,
    SaveSettingsDTO,
};