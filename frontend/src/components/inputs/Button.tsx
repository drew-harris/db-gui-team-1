export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
}

export default function Button(props: ButtonProps) {
  const { className, children, ...rest } = props;
  return (
    <button {...rest} className=" p-2 font-bold rounded-lg bg-slate-600">
      {children}
    </button>
  );
}
