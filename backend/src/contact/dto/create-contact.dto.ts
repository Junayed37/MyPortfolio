import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @IsEmail({}, { message: "Please provide a valid email address" })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Message cannot be empty" })
  @MinLength(10, { message: "Message must be at least 10 characters long" })
  @MaxLength(2000)
  message: string;
}
