import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from './responseDto';

export const ApiGenericOkResponse = <DataDto extends Type<unknown>>(
    dataDto: DataDto,
) =>
    applyDecorators(
        ApiExtraModels(ResponseDto, dataDto),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResponseDto) },
                    {
                        properties: {
                            data: {
                                $ref: getSchemaPath(dataDto),
                            },
                        },
                    },
                ],
            },
        }),
    );