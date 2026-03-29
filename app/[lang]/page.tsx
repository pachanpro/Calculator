export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <div>Hello, {lang}!</div>;
}