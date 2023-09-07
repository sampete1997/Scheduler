import bcrypt from "bcrypt";

export const encryptString = async (password: string): Promise<string> => {
  const rounds = 10;
  return await bcrypt.hash(password, rounds);
};

export const matchEncryptedString = async(
  plainString: string,
  hashedString: any
)  => {
  return await bcrypt.compare(plainString, hashedString);
};
