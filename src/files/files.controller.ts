import { Controller, UploadedFile, BadRequestException, Res, Param } from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express'
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilesFindProductImage, FilesUploadFile } from './decorators/files.decorators';

@ApiTags('Files')
@Controller('files')
@ApiBearerAuth()
export class FilesController {

  constructor(
      private readonly filesService: FilesService,
      private readonly configService: ConfigService ) {}

  @FilesFindProductImage()
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticProductImage( imageName );    
    res.sendFile( path );

  }

  @FilesUploadFile()
  uploadFile( 
    @UploadedFile()     
    file: Express.Multer.File 
    ) {

      if ( !file ) {
        throw new BadRequestException('Make sure that the file is an image');
      }

      const secureUrl = `${ this.configService.get('HOST_API') }/files/product/${ file.filename }`;
      
      return { secureUrl };
  }
  
}
