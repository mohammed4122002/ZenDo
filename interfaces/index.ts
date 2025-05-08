export default interface Todo {
  id: string;
    title: string;
    body?: string| null;
    completed: boolean;
    createdAt: Date;
}