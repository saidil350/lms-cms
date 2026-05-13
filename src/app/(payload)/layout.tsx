import '@payloadcms/next/css'

import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig'
import { ProgressBar, RootProvider } from '@payloadcms/ui'
import { rtlLanguages } from '@payloadcms/translations'
import { cookies as nextCookies } from 'next/headers.js'
import type { ImportMap, ServerFunctionClient } from 'payload'
import { applyLocaleFiltering } from 'payload/shared'
import React, { Suspense } from 'react'

import { getNavPrefs } from '../../../node_modules/@payloadcms/next/dist/elements/Nav/getNavPrefs.js'
import { checkDependencies } from '../../../node_modules/@payloadcms/next/dist/layouts/Root/checkDependencies.js'
import { initReq } from '../../../node_modules/@payloadcms/next/dist/utilities/initReq.js'
import { getRequestTheme } from '../../../node_modules/@payloadcms/next/dist/utilities/getRequestTheme.js'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'

  try {
    const { handleServerFunctions } = await import('@payloadcms/next/layouts')
    const config = await import('@payload-config')
    const { importMap } = await import('./admin/importMap.js')

    return handleServerFunctions({
      ...args,
      config: config.default,
      importMap,
    })
  } catch (error) {
    console.error('Failed to create server function:', error)
    return null
  }
}

async function NestProviders({
  children,
  importMap,
  providers,
  serverProps,
}: {
  children: React.ReactNode
  importMap: ImportMap
  providers: any[]
  serverProps: Record<string, unknown>
}) {
  if (!Array.isArray(providers) || providers.length === 0) {
    return <>{children}</>
  }

  const [Component, ...rest] = providers

  return RenderServerComponent({
    clientProps: {
      children:
        rest.length > 0 ? (
          <NestProviders
            importMap={importMap}
            providers={rest}
            serverProps={serverProps}
          >
            {children}
          </NestProviders>
        ) : (
          children
        ),
    },
    Component,
    importMap,
    serverProps,
  })
}

async function RootLayoutContent({
  children,
  config: configPromise,
  htmlProps = {},
  importMap,
  serverFunction: serverFn,
}: {
  children: React.ReactNode
  config: Promise<any>
  htmlProps?: React.HtmlHTMLAttributes<HTMLHtmlElement>
  importMap: ImportMap
  serverFunction: ServerFunctionClient
}) {
  const {
    headers: requestHeaders,
    languageCode,
    permissions,
    req,
    req: {
      payload: { config },
    },
  } = await initReq({
    configPromise,
    importMap,
    key: 'RootLayout',
  })

  const theme = getRequestTheme({
    config,
    cookies: await nextCookies(),
    headers: requestHeaders,
  })

  const dir = rtlLanguages.includes(
    languageCode as (typeof rtlLanguages)[number],
  )
    ? 'RTL'
    : 'LTR'

  const languageOptions = Object.entries(config.i18n.supportedLanguages || {}).reduce<
    { label: string; value: string }[]
  >((acc, [language, languageConfig]) => {
    if (Object.keys(config.i18n.supportedLanguages).includes(language)) {
      acc.push({
        label: languageConfig.translations.general.thisLanguage,
        value: language,
      })
    }

    return acc
  }, []) as any

  async function switchLanguageServerAction(lang: string) {
    'use server'

    const cookies = await nextCookies()

    cookies.set({
      name: `${config.cookiePrefix || 'payload'}-lng`,
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      value: lang,
    })
  }

  const navPrefs = await getNavPrefs(req)
  const clientConfig = getClientConfig({
    config,
    i18n: req.i18n,
    importMap,
    user: req.user ?? true,
  })

  await applyLocaleFiltering({
    clientConfig,
    config,
    req,
  })

  return (
    <html
      {...htmlProps}
      data-theme={theme}
      dir={dir}
      lang={languageCode}
      suppressHydrationWarning
    >
      <head>
        <style>{`@layer payload-default, payload;`}</style>
      </head>
      <body suppressHydrationWarning={true}>
        <RootProvider
          config={clientConfig}
          dateFNSKey={req.i18n.dateFNSKey}
          fallbackLang={config.i18n.fallbackLanguage}
          isNavOpen={navPrefs?.open ?? true}
          languageCode={languageCode}
          languageOptions={languageOptions}
          locale={req.locale ?? undefined}
          permissions={permissions}
          serverFunction={serverFn}
          switchLanguageServerAction={switchLanguageServerAction}
          theme={theme}
          translations={req.i18n.translations}
          user={req.user}
        >
          <ProgressBar />
          {Array.isArray(config.admin?.components?.providers) &&
          config.admin?.components?.providers.length > 0 ? (
            <NestProviders
              importMap={req.payload.importMap}
              providers={config.admin.components.providers}
              serverProps={{
                i18n: req.i18n,
                payload: req.payload,
                permissions,
                user: req.user,
              }}
            >
              {children}
            </NestProviders>
          ) : (
            children
          )}
        </RootProvider>
        <div id="portal" />
      </body>
    </html>
  )
}

const Layout = async ({ children }: Args) => {
  checkDependencies()

  try {
    const { importMap } = await import('./admin/importMap.js')
    const config = await import('@payload-config')

    return (
      <Suspense fallback={null}>
        <RootLayoutContent
          config={config.default}
          htmlProps={{
            suppressHydrationWarning: true,
          }}
          importMap={importMap}
          serverFunction={serverFunction}
        >
          {children}
        </RootLayoutContent>
      </Suspense>
    )
  } catch (error) {
    console.error('Failed to render Payload admin layout:', error)
    return <>{children}</>
  }
}

export default Layout
