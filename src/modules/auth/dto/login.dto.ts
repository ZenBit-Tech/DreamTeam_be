import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTczMDU2NTM4OCwiZXhwIjoxNzMwNjUxNzg4fQ.6v--ZmHjzpa5Tt5EQ-rvOn7H61jAxOJiO3Ip7u6X-8k',
  })
  token: string;
}
