import {User} from "@firebase/auth";

interface LayoutProps {
  children: JSX.Element,
  isLoggedIn: boolean,
}

export default function Layout({ children, isLoggedIn }: LayoutProps) {
  return isLoggedIn
    ? (
      <>
        <header>
          header
        </header>
        <main>
          { children }
        </main>
        <footer>
          footer
        </footer>
      </>
    )
    : children
}