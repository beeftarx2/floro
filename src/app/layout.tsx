import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'

const inter = Inter({ subsets: ['latin'] })

const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily: inter.style.fontFamily,
  defaultRadius: 'md',
})

export const metadata: Metadata = {
  title: 'Floro',
  description: 'Your personal growth platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
