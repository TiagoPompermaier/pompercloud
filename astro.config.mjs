// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  // Endereço final do site. Troque quando o domínio estiver definido.
  // É usado para montar as URLs completas dentro dos índices dos agentes.
  site: 'https://docs.pompermaiercont.com.br',

  integrations: [
    starlight({
      title: 'Central de Ajuda PomperCloud',
      description: 'Como usar os módulos do PomperCloud, da Pompermaier Contabilidade Empresarial.',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Português', lang: 'pt-BR' },
      },
      customCss: ['./src/styles/pompermaier.css'],
      favicon: '/favicon.svg',
      lastUpdated: true,

      // Menu lateral: um grupo por módulo, montado automaticamente a partir das pastas.
      // Para adicionar um módulo novo, crie a pasta e acrescente um bloco aqui.
      sidebar: [
        { label: 'Comece aqui', link: '/' },
        { label: 'RDFIN', items: [{ autogenerate: { directory: 'rdfin' } }] },
        { label: 'Ficha de Admissão', items: [{ autogenerate: { directory: 'ficha-de-admissao' } }] },
      ],
    }),
  ],
});
