export interface ConfirmData {
  prompt: string;
  title?: string;
  action: () => any | Promise<any>;
}
