export interface User {
  id?: string;
  name: string;
  messages?: { [id: string]: Message | undefined };
}

export interface Message {
  id?: string;
  text: string;
  userId?: string;
}
