import Link from "next/link";

type CardProps = {
  href: string;
  title: string;
  description: string;
  icon?: string;
};

export default function Card({ href, title, description, icon }: CardProps) {
  return (
    <Link
      href={href}
      className="block group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-lg card-hover"
    >
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{description}</p>
    </Link>
  );
}