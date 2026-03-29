type FooterProps = {
  footerText: string;
};

export default function Footer({ footerText }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        {footerText}
      </div>
    </footer>
  );
}