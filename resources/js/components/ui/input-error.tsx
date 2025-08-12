import { cn } from '@/lib/utils';

export interface InputErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

export function InputError({ message, className, ...props }: InputErrorProps) {
    return message ? (
        <p {...props} className={cn('text-sm text-red-600', className)}>
            {message}
        </p>
    ) : null;
}