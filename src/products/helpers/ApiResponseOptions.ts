import { ApiParamOptions, ApiResponseOptions, getSchemaPath } from "@nestjs/swagger";
import { Product } from "../entities";

export const apiResponseOptionsFindAll: ApiResponseOptions = {    
    schema: {
      allOf: [        
        {
          properties: {
            'products': {
              type: 'array',
              items: { $ref: getSchemaPath(Product) },
            },
          },
        },
      ],
    },
  };

  export const apiParamOptionsFindOne: ApiParamOptions = {
    name: 'term',
    type: String,
    description: 'Termino de búsqueda',
    example: '67a1ef19-5c5a-452b-9b59-6fb4139bcf7d',
  };

  export const apiResponseOptionsFindOne: ApiResponseOptions = {
    description: 'El producto fue encontrado satisfactoriamente.',
    type: Product,
  };

  export const apiResponseOptionsCreate: ApiResponseOptions[] = 
  [
    { status: 201, description: 'El producto fue creado', type: Product  },
    { status: 400, description: 'Bad request' },
    { status: 403, description: 'Forbidden. Token related.' }
  ];

  export const apiResponseOptionsUpdate: ApiResponseOptions[] = 
  [
    { status: 200, description: 'El producto fue actualizado', type: Product },
    { status: 400, description: 'Bad request' },
    { status: 403, description: 'Forbidden. Token related.' }
  ];

  export const apiParamOptionsUpdateRemove: ApiParamOptions = {
    name: 'id',
    type: String,
    description: 'Identificador del producto.',
    example: '67a1ef19-5c5a-452b-9b59-6fb4139bcf7d',
  };

  export const apiResponseOptionsRemove: ApiResponseOptions[] = 
  [
    { status: 200, description: 'El producto fue eliminado' },
    { status: 400, description: 'Bad request' },
    { status: 403, description: 'Forbidden. Token related.' }
  ];