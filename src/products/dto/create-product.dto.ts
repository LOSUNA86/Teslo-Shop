import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateProductDto {

    @ApiProperty({
        description: 'Título del producto (unique)',
    })
    @IsString()
    @MinLength(1)
    title: string;


    @ApiProperty({
        description: 'Precio del producto',
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        description: 'Descripción del producto',        
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Slug del producto',    
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        description: 'Stock mínimo en inventario',       
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number; 

    @ApiProperty({
        description: 'Arreglo de tallas',              
    })
    @IsString({ each: true })
    @IsArray()
    sizes: string[]

    @ApiProperty({
        description: 'Genéro del producto',              
    })
    @IsIn(['men','women','kid','unisex'])
    gender: string;

    @ApiProperty({
        description: 'Arreglo de tags',              
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({
        description: 'Arreglo de imágenes',              
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

}
