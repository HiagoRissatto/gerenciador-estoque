function calculateCpfDigit(base: string, initialWeight: number): number {
  const sum = base
    .split("")
    .reduce(
      (acc, digit, index) =>
        acc + Number(digit) * (initialWeight - index),
      0
    );

  const remainder = sum % 11;

  return remainder < 2 ? 0 : 11 - remainder;
}

export function isValidCpf(cpf: string): boolean {
  const cleanedCpf = cpf.replace(/\D/g, "");

  if (
    cleanedCpf.length !== 11 ||
    /^(\d)\1+$/.test(cleanedCpf)
  ) {
    return false;
  }

  const base = cleanedCpf.slice(0, 9);

  const firstDigit = calculateCpfDigit(base, 10);

  const secondDigit = calculateCpfDigit(
    base + firstDigit,
    11
  );

  return cleanedCpf === `${base}${firstDigit}${secondDigit}`;
}

function calculateCnpjDigit(
  base: string,
  weights: number[]
): number {
  const sum = base
    .split("")
    .reduce(
      (acc, digit, index) =>
        acc + Number(digit) * weights[index]!,
      0
    );

  const remainder = sum % 11;

  return remainder < 2 ? 0 : 11 - remainder;
}

export function isValidCnpj(cnpj: string): boolean {
  const cleanedCnpj = cnpj.replace(/\D/g, "");

  if (
    cleanedCnpj.length !== 14 ||
    /^(\d)\1+$/.test(cleanedCnpj)
  ) {
    return false;
  }

  const base = cleanedCnpj.slice(0, 12);

  const firstDigit = calculateCnpjDigit(
    base,
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );

  const secondDigit = calculateCnpjDigit(
    base + firstDigit,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );

  return cleanedCnpj === `${base}${firstDigit}${secondDigit}`;
}