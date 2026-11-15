/**
 * A field people never see or reach with the keyboard. Form-filling bots fill in every field, so
 * a value here marks the submission as a bot's (pages/api/enquiry.ts drops it).
 */
export default function SpamTrap({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company website
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
