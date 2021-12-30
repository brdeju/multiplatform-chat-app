export interface IUserJWT {
  id: string;
  email: string;
}

export type File = {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  destination: string,
  filename: string,
  path: string,
  size: number,
}
