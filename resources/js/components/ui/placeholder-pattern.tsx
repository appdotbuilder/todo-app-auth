import { cn } from '@/lib/utils';

type PlaceholderPatternProps = React.SVGProps<SVGSVGElement>

export function PlaceholderPattern({ className, ...props }: PlaceholderPatternProps) {
  return (
    <svg
      className={cn('text-muted-foreground/10', className)}
      fill="none"
      viewBox="0 0 400 400"
      {...props}
    >
      <defs>
        <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
    </svg>
  );
}