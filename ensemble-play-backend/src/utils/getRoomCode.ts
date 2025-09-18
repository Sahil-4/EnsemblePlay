export const getRoomCode = (length: number = 6) => {
  const T = 26 + 10;
  const options = "Q9TYU102IOPAM75SGHJKLZXCVBNWER84DF63";

  const code: string[] = [];

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * 1001);
    const character = options[index % T];
    code.push(character);
  }

  return code.join("");
};
