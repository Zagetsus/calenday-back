type TRemoveTypes = 'cpf' | 'cnpj' | 'phone' | 'card';

export const removeMask = (text: string, type: TRemoveTypes): string => {
  switch (type) {
    case 'cpf':
      text = text.replace('.', '');
      text = text.replace('.', '');
      text = text.replace('-', '');
      break;
    case 'cnpj':
      text = text.replace('.', '');
      text = text.replace('.', '');
      text = text.replace('/', '');
      text = text.replace('-', '');
      break;
    case 'phone':
      text = text.replace('(', '');
      text = text.replace(')', '');
      text = text.replace(' ', '');
      text = text.replace('-', '');
      break;
    case 'card':
      text = text.replace(/\s/g, '');
      break;
  }

  return text;
};
