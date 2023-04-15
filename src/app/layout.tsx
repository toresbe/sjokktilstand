import './globals.css'
import "@fontsource/roboto";


export const metadata = {
  title: 'Sjokktilstand',
  description: 'Oppdatert oversikt over Dagbladets sjokktilstand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  )
}
