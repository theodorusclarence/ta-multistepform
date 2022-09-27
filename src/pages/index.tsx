import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <Vercel className='text-5xl' />
            <h1 className='mt-4'>TA Multistep Form</h1>
            <p className='mt-2 text-sm text-gray-800'>
              Code refactoring for PPDB Jatim using Next.js, TypeScript,
              Tailwind CSS, React Hook Form, and Zustand.
            </p>
            <p className='mt-2 text-sm text-gray-700'>
              <ArrowLink href='https://github.com/theodorusclarence/ta-multistepform'>
                See the repository
              </ArrowLink>
            </p>

            <div className='mt-8'>
              <ButtonLink
                href='/pendaftaran/sma/prestasi/pendataan'
                variant='light'
              >
                Registrasi
              </ButtonLink>
            </div>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
                Theodorus Clarence
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
