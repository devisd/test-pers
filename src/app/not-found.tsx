import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mt-20 flex flex-col items-center gap-10">
      <h1 className="text-3xl">Этой страницы не существует</h1>
      <Link href="/" className="rounded-2xl border border-[#fcfcfc] p-4 backdrop-blur-xl">
        Вернуться на главную страницу
      </Link>
    </div>
  )
}
