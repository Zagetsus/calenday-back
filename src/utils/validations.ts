import { removeMask } from './removeMask';

export function validateCNPJ(cnpj: string) {
  cnpj = removeMask(cnpj, 'cnpj');

  const textCnpj = cnpj.substring(0, 12);
  const arrayCnpj = textCnpj.split('');

  let summation = 0;
  let restDivision;
  let firstValidator: number;
  let secondValidator;

  let cont = 5;
  let indexCnpj = 0;

  while (indexCnpj <= 11) {
    if (indexCnpj === 4) {
      cont = 9;
    }

    summation += Number(arrayCnpj[indexCnpj]) * cont;

    cont -= 1;
    indexCnpj += 1;
  }

  restDivision = summation % 11;

  restDivision < 2
    ? (firstValidator = 0)
    : (firstValidator = 11 - restDivision);

  arrayCnpj.push(String(firstValidator));

  summation = 0;

  cont = 6;
  indexCnpj = 0;

  while (indexCnpj <= 12) {
    if (indexCnpj === 5) {
      cont = 9;
    }

    summation += Number(arrayCnpj[indexCnpj]) * cont;

    cont -= 1;
    indexCnpj += 1;
  }

  restDivision = summation % 11;

  restDivision < 2
    ? (secondValidator = 0)
    : (secondValidator = 11 - restDivision);

  const lastDigits: string = cnpj.substring(12, 14);
  const lastDigitsArray: string[] = lastDigits.split('');

  return (
    Number(lastDigitsArray[0]) === firstValidator &&
    Number(lastDigitsArray[1]) === secondValidator
  );
}
