export const isIntegerBewteen = ({ input, min, max }: Props) => {
  const number = Number(input);

  return number >= min && number <= max && Number.isInteger(number);
};

interface Props {
  input: string | number;
  min: number;
  max: number;
}
