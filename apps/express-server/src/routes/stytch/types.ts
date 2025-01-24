export type CreateMemberBody = {
  email: string;
	name?: string;
	phone?: string;
}

export type UserLogin = {
	email: string;
	password: string;
}

export type EmailPayload = Pick<UserLogin, 'email'>;

export type PasswordStrengthBody = Pick<UserLogin, 'password'>;

export type GetMember = {
	memberId: string;
}

export type VerifyCode = GetMember &{
	code: string;
}