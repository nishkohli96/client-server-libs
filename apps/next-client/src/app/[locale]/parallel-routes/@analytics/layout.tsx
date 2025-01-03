type LayoutProps = {
  children: React.ReactNode;
};

export default function AnalyticsPageLayout({ children }: LayoutProps) {
  return (
    <div
      style={{
        background: '#ea3677',
        padding: '10px',
        borderRadius: 2,
        color: 'white'
      }}
    >
      <p>Analytics Layout</p>
      {children}
    </div>
  );
}
