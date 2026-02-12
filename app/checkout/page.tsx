import { Metadata } from 'next'
import CheckoutContent from './CheckoutContent'

export const metadata: Metadata = {
  title: 'Checkout | ZOR Professional',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return <CheckoutContent />
}
