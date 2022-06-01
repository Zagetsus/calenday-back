import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { fullNameRegex, passwordRegex } from '../../utils/regex';

export class UserValidate {
  @IsOptional()
  @IsEmail()
  @IsString({ message: 'O e-mail deve ser um texto.' })
  email: string;

  @IsOptional()
  @Matches(fullNameRegex, {
    message: 'Digite seu nome completo.',
  })
  name: string;

  @IsOptional()
  @Matches(passwordRegex, {
    message:
      'A senha deverá conter no mínimo 8 caracteres, contendo letras e números.',
  })
  password: string;
}
