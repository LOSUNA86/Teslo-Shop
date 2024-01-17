import { Get, Post, UseInterceptors, applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiParam } from "@nestjs/swagger";
import { Auth } from "src/auth/decorators";
import { ValidRoles } from "src/auth/interfaces";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from "../helpers";
import { FileUploadDto } from "../dto/file.dto";


export function FilesFindProductImage() {
    return applyDecorators(
        Get('product/:imageName'),
        Auth(),
        ApiParam({
          name: 'imageName',
          type: String,
          description: 'Nombre de la imagen',
          example: 'imagen.jpg',
        }),
    );  
}

export function FilesUploadFile() {
    return applyDecorators(
        Auth( ValidRoles.admin ),
        Post('product'),
        UseInterceptors(FileInterceptor('file', {
          fileFilter: fileFilter,
          storage: diskStorage({
            destination: './static/products',
            filename: fileNamer
          }),
        }),),  
        ApiConsumes('multipart/form-data'),
        ApiBody({
          description: 'Files image',
          type: FileUploadDto,
        }),
    );  
}

