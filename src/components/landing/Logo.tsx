/**
 * Logo component - Sunder branding.
 * Icon + wordmark using DM Sans for a bold, geometric feel.
 */
export function Logo({
  className,
  iconClassName = 'text-sunder-green',
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { iconClassName?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ''}`} {...props}>
      {/* Icon */}
      <svg
        aria-hidden="true"
        viewBox="0 0 18 15"
        fill="none"
        className={`h-5 w-auto ${iconClassName}`}
      >
        <path
          d="M0.593 5.206L3.03 14.714c.041.143.227.256.465.281.237.025.475-.044.588-.175l2.623-2.982L0.593 5.206zm10.75 5.329L.221 3.758l8.251 8.952c.093.113.289.181.496.181.206 0 .402-.068.496-.181l1.879-2.175zM17.938 2.894L9.748.131c-.506-.175-1.126-.175-1.632 0L0 2.894l14.664 8.94c.145.087.372.125.568.081.196-.037.351-.144.382-.269l2.324-8.752z"
          fill="currentColor"
        />
      </svg>
      {/* Wordmark */}
      <span
        className="text-[19px] tracking-[-0.02em]"
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}
      >
        Sunder
      </span>
    </div>
  )
}
