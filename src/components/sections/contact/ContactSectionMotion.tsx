export function ContactSectionMotion({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-20 md:grid-cols-2 md:items-start">
      <div className="view-animate">{left}</div>
      <div className="view-animate">{right}</div>
    </div>
  );
}
