import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useLogin, useRegister } from '@/hooks/mutations/useAuthMutation';

const schema = z
  .object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid e-mail address'),
    password: z.string().min(8, 'Must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const {mutate: registerUser} = useRegister()

  const onSubmit = (data: FormValues) => {
    const registerData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password
    }
    registerUser(registerData)
  };

  return (
    <Card {...props} className='max-w-screen-md mx-auto'>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* ---------- Full Name ---------- */}
            <Field>
              <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register('fullName')}
              />
              {errors.fullName && (
                <FieldDescription className="text-destructive">
                  {errors.fullName.message}
                </FieldDescription>
              )}
            </Field>

            {/* ---------- Email ---------- */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
              />
              {errors.email && (
                <FieldDescription className="text-destructive">
                  {errors.email.message}
                </FieldDescription>
              )}
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>

            {/* ---------- Password ---------- */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <FieldDescription className="text-destructive">
                  {errors.password.message}
                </FieldDescription>
              )}
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            {/* ---------- Confirm Password ---------- */}
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <FieldDescription className="text-destructive">
                  {errors.confirmPassword.message}
                </FieldDescription>
              )}
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>

            {/* ---------- Buttons ---------- */}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating…' : 'Create Account'}
                </Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}