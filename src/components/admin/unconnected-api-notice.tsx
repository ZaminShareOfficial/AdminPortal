type UnconnectedApiNoticeProps = {
  screen: string;
};

export function UnconnectedApiNotice({ screen }: UnconnectedApiNoticeProps) {
  return (
    <div className="mb-6 border border-secondary/30 bg-secondary-container/10 px-4 py-3 text-sm text-secondary">
      {screen} is still using design mock data. No matching endpoint exists in
      the current Swagger API yet.
    </div>
  );
}
