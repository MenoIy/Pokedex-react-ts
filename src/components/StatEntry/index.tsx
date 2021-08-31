type StatEntryProps = {
  name: string;
  value: number;
  unit?: string;
};

const StatEntry = ({ name, value, unit }: StatEntryProps): JSX.Element => {
  return (
    <div className="statEntry">
      <span className="statEntry-value">{value}</span>
      <span className="statEntry-unit">{unit || ""}</span>
      <div className="statEntry-name">{name}</div>
    </div>
  );
};

export default StatEntry;
