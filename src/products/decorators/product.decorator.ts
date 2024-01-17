import { Delete, Get, Patch, Post, applyDecorators } from '@nestjs/common';
import * as options from '../helpers/ApiResponseOptions';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

export function ProductFindOne() {
  return applyDecorators(
    Get(':term'),  
    Auth(),
    ApiParam( options.apiParamOptionsFindOne ),
    ApiCreatedResponse( options.apiResponseOptionsFindOne ),
  );
};

export function ProductFindAll() {
  return applyDecorators(
    Get(),
    Auth(),
    ApiOkResponse( options.apiResponseOptionsFindAll ),
  );
};

export function ProductCreate() {
  return applyDecorators(
    Post(),
    Auth( ValidRoles.admin ),
    ApiResponse( options.apiResponseOptionsCreate[0] ),
    ApiResponse( options.apiResponseOptionsCreate[1] ),
    ApiResponse( options.apiResponseOptionsCreate[2] ),
  );
};

export function ProductUpdate() {
  return applyDecorators(
    Patch(':id'),
    Auth( ValidRoles.admin ),
    ApiResponse( options.apiResponseOptionsUpdate[0] ),
    ApiResponse( options.apiResponseOptionsUpdate[1] ),
    ApiResponse( options.apiResponseOptionsUpdate[2] ),
    ApiParam( options.apiParamOptionsUpdateRemove ),
  );
};

export function ProductRemove() {
  return applyDecorators(
    Delete(':id'),
    Auth( ValidRoles.admin ),
    ApiResponse( options.apiResponseOptionsRemove[0] ),
    ApiResponse( options.apiResponseOptionsRemove[1] ),
    ApiResponse( options.apiResponseOptionsRemove[2] ),
    ApiParam( options.apiParamOptionsUpdateRemove ),
  );
};