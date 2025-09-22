import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';

export function encodeToken(userId: string, email: string) {
    const jwtService = new JwtService();
    return jwtService.sign({ userId: userId }, { secret: email });
}

export function decodeToken(token: string, email: string) {
    const jwtService = new JwtService();
    return jwtService.verify(token, { secret: email });
}

export function isDifferenceOverAMonth(startDate, endDate) {
    const oneMonthInMilliseconds = 1000 * 60 * 60 * 24 * 31;
    const differenceInMilliseconds = Math.abs(startDate - endDate);
    console.log(oneMonthInMilliseconds);
    console.log(differenceInMilliseconds);
    if (startDate > endDate)
        throw new BadRequestException(
            'Start date cannot be an earlier date than end date',
        );
    if (differenceInMilliseconds >= oneMonthInMilliseconds)
        throw new BadRequestException(
            'Date range is too wide, limit is 31 days',
        );
    return;
}
