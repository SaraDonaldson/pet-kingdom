
interface Props {
  clickFunction: Function;
  label: string;
}
export default function Button({ clickFunction, label }: Props) {
  return (
    <div
      className={
        "w-24 text-lg font-semibold bg-purple-600 hover:bg-opacity-60 text-center "
      }
      onClick={() => clickFunction()}
    >
      {label}
    </div>
  );
}
