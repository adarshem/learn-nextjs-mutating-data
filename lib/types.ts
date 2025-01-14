export type PostObj = {
  id: number;
  image?: string;
  title: string;
  content: string;
  createdAt: string;
  userFirstName: string;
  userLastName: string;
  likes: number;
  isLiked: boolean;
};

export type FormState = {
  errors: string[];
};

export type FormAction = (
  prevState: FormState,
  formData: FormData
) => Promise<FormState> | FormState;
