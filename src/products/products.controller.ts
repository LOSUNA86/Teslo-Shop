import { Controller, Body, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductFindOne, ProductFindAll, ProductCreate, ProductUpdate, ProductRemove } from './decorators/product.decorator';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  
  constructor( private readonly productsService: ProductsService ) {}
  
  @ProductFindAll()
  findAll( 
    @Query() paginationDto: PaginationDto) {    
    return this.productsService.findAll( paginationDto );
  }

 
  @ProductFindOne()
  findOne( 
    @Param('term') term: string, ) {
    return this.productsService.findOnePlain(term);
  }

  @ProductCreate()
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User ) {
    return this.productsService.create(createProductDto, user);
  }

  @ProductUpdate()
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updateProductDto: UpdateProductDto, 
    @GetUser() user: User) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @ProductRemove()
  remove(
    @Param('id', ParseUUIDPipe ) id: string, ) {
    return this.productsService.remove(id);
  }

}
