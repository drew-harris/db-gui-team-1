export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "className"> {
  label?: string;
  className?: string;
}

export default function Input(props: InputProps) {
  const { label, className, ...rest } = props;
  return (
    <div>
      {label ? <div>{label}</div> : null}
      <input
        {...rest}
        className={`p-2 border-white text-white font-semibold bg-slate-900 rounded border-none ${className}`}
      />
    </div>
  );
}
