import { ApiProperty } from '@nestjs/swagger';

export default class IUser {
    @ApiProperty()
    id: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    email: string;
}