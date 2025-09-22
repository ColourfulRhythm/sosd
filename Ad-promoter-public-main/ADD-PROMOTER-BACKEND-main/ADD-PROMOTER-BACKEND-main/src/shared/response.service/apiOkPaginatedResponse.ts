import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PagedListDto } from './pagedListDto';

export const ApiOkPaginatedResponse = <DataDto extends Type<unknown>>(
    dataDto: DataDto,
) =>
    applyDecorators(
        ApiExtraModels(PagedListDto, dataDto),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(PagedListDto) },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(dataDto) },
                            },
                        },
                    },
                ],
            },
        }),
    );