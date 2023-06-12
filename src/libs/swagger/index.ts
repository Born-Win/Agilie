import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const HTTP_EXCEPTION_DEFAULT_RESPONSE = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      }
    }
  }
};

export const generateSuccessfulContentObject = (
  schemaProperties?: SchemaObject['properties']
) => {
  return {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            ...schemaProperties
          }
        }
      }
    }
  };
};
