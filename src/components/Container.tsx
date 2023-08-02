import Link from 'next/link'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="header fixed bg-white top-0 left-0 right-0 z-10 shadow">
        <div className="header__container h-[56px] px-4 max-w-[1280px] mx-auto flex items-center">
          <Link className="header__title" href="/"> 
            <p className='text-2xl font-black'>Next.js + Sanity</p>
          </Link>
        </div>
      </header>
      <div className='page-content-wrapper w-full bg-slate-100 pt-[56px]'>{children}</div>
      <footer className="footer">
        <p className="footer__text text-center py-6">
          Made with{' '}
          <svg
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
            datasanity-icon="heart-filled"
            width="1em"
            height="1em"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.2"
            ></path>
          </svg>{' '}
          at Sanity
        </p>
      </footer>
    </>
  )
}
