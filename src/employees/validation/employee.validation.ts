import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { fullNameRegex, passwordRegex } from '../../utils/regex';

export class EmployeeValidate {
  @IsEmail()
  @IsString({ message: 'O e-mail deve ser um texto.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @Matches(fullNameRegex, {
    message: 'Digite seu nome completo.',
  })
  name: string;

  @Matches(passwordRegex, {
    message:
      'A senha deverá conter no mínimo 8 caracteres, contendo letras e números.',
  })
  password: string;

  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  cpf: string;

  @IsNotEmpty({ message: 'O celular é obrigatório.' })
  phone: string;
}
