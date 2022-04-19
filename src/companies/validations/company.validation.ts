import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyValidate {
  @IsString({ message: 'O CNPJ deve ser um texto.' })
  @IsNotEmpty({ message: 'O CNPJ é obrigatório.' })
  cnpj: string;

  @IsString({ message: 'O nome do salão deve ser um texto.' })
  @IsNotEmpty({ message: 'O Nome do salão é obrigatório.' })
  name: string;

  @IsString({ message: 'A Razão Social deve ser um texto.' })
  @IsNotEmpty({ message: 'A Razão Social é obrigatória.' })
  corporate_name: string;

  @IsString({ message: 'O Nome fantasia deve ser um texto.' })
  trading_name: string;
}
