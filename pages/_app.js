import '../styles/globals.css'
import { CartProvider } from '../components/CartContext'
import Layout from '../components/Layout'
import Head from 'next/head'
import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#050505" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="canonical" href="https://prestigeflow.fr" />
        <meta property="og:site_name" content="PrestigeFlow" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Restaurant JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Restaurant',
          name: 'PrestigeFlow',
          image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
          url: 'https://prestigeflow.fr',
          telephone: '+33 1 42 68 99 00',
          email: 'contact@prestigeflow.fr',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '42 Avenue des Champs-Élysées',
            addressLocality: 'Paris',
            postalCode: '75008',
            addressCountry: 'FR',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 48.8698,
            longitude: 2.3075,
          },
          servesCuisine: ['Française', 'Gastronomique'],
          priceRange: '$$$$',
          stars: { '@type': 'Rating', ratingValue: 3, bestRating: 3 },
          aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 347 },
          openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '12:00', closes: '14:30' },
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '19:00', closes: '22:30' },
          ],
        }) }} />
      </Head>

      {/* Google Analytics */}
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}')`}
          </Script>
        </>
      )}

      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </>
  )
}
