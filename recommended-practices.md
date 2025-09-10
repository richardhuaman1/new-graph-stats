# Prácticas recomendadas
Este documento presenta los lineamientos de arquitectura y mejores prácticas para desarrolladores frontend en Apuesta Total. Su objetivo es garantizar la calidad, consistencia y escalabilidad de los proyectos, promoviendo el uso de herramientas modernas, técnicas de optimización y principios de desarrollo enfocados en:

## Índice

1. [Rendimiento](#1-rendimiento)  
   1.1 [Uso de React.memo y useCallback](#11-uso-de-reactmemo-y-usecallback)  
   1.2 [Optimización de Solicitudes de Datos](#12-optimización-de-solicitudes-de-datos)  
   1.3 [División de Código (Code Splitting)](#13-división-de-código-code-splitting)  
   1.4 [Uso de next/script para Scripts de Terceros](#14-uso-de-nextscript-para-scripts-de-terceros)  
   1.5 [Optimización de Imágenes](#15-optimización-de-imágenes)  
   1.6 [Renderizado Estático y Dinámico](#16-renderizado-estático-y-dinámico)  
   1.7 [Evita Cargar Código Innecesario](#17-evita-cargar-código-innecesario)  
   1.8 [Análisis de Rendimiento](#18-análisis-de-rendimiento)  
2. [Gestión de Estado](#2-gestión-de-estado)  
   2.1 [Estado Local](#21-estado-local)  
   2.2 [Estado Global](#22-estado-global)  
   2.3 [Estado de Servidor](#23-estado-de-servidor)  
   2.4 [Persistencia del Estado](#24-persistencia-del-estado)  
3. [SEO y Accesibilidad](#3-seo-y-accesibilidad)  
   3.1 [Metadatos](#31-metadatos)  
   3.2 [Etiquetas Open Graph y Twitter Cards](#32-etiquetas-open-graph-y-twitter-cards)  
   3.3 [Etiquetas de Encabezado](#33-etiquetas-de-encabezado)  
   3.4 [Sitemap y Robots.txt](#34-sitemap-y-robotstxt)  
   3.5 [Imágenes Optimizadas](#35-imágenes-optimizadas)  
   3.6 [Accesibilidad](#36-accesibilidad)  
   3.7 [Etiquetas Canonical](#37-etiquetas-canonical)

## **1 Rendimiento**

### **1.1 Uso de `React.memo` y `useCallback`**

- Usa `React.memo` para evitar renders innecesarios en componentes que no cambian frecuentemente.
- Usa `useCallback` para memorizar funciones y evitar recrearlas en cada render.

```jsx
import React, { memo, useCallback } from 'react'

const Button = memo(({ onClick }: { onClick: () => void }) => {
  return <button onClick={onClick}>Click me</button>
})

export default function App() {
  const handleClick = useCallback(() => {
    // console.log('Clicked')
  }, [])

  return <Button onClick={handleClick} />
}
```

---

### **1.2 Optimización de Solicitudes de Datos**

- Usa **SWR** o **React Query** para manejar datos con caché y revalidación automática.
- Configura intervalos de revalidación solo cuando sea necesario.

```jsx
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Component() {
  const { data, error } = useSWR('/api/data', fetcher, {
    refreshInterval: 5000
  })

  if (error) return <div>Error</div>
  if (!data) return <div>Loading...</div>

  return <div>{data.name}</div>
}
```

---

### **1.3 División de Código (Code Splitting)**

- Usa la función `dynamic` de Next.js para cargar componentes de forma dinámica.
- Habilita `ssr: false` para componentes que solo se renderizan en el cliente.

```jsx
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false
})

export default function Page() {
  return <DynamicComponent />
}
```

---

### **1.4 Uso de `next/script` para Scripts de Terceros**

- Usa el componente `next/script` para cargar scripts de terceros de manera optimizada.

```jsx
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script src='https://example.com/script.js' strategy='lazyOnload' />
      <div>Contenido de la página</div>
    </>
  )
}
```

---

### **1.5 Optimización de Imágenes**

- Usa el componente `next/image` para cargar imágenes de manera optimizada.
- Configura el atributo `priority` para imágenes críticas.
- Usa formatos modernos como **WebP** y habilita el `lazy loading` para imágenes no críticas.

```jsx
import Image from 'next/image'
;<Image
  src='/example.jpg'
  alt='Descripción'
  width={500}
  height={300}
  priority // Para imágenes críticas
/>
```

---

### **1.6 Renderizado Estático y Dinámico**

- Usa **Static Site Generation (SSG)** para contenido que no cambia frecuentemente.
- Usa **Server-Side Rendering (SSR)** para contenido dinámico.
- Usa **Incremental Static Regeneration (ISR)** para regenerar páginas estáticas en segundo plano.

---

### **1.7 Evita Cargar Código Innecesario**

- Usa `tree-shaking` para eliminar código no utilizado.
- Importa solo lo necesario de librerías grandes.

```jsx
// En lugar de importar todo:
import _ from 'lodash'

// Importa solo lo necesario:
import debounce from 'lodash/debounce'
```

---

### **1.8 Análisis de Rendimiento**

- Usa herramientas como **Lighthouse**, **React DevTools**, y el comando `next build` para identificar problemas de rendimiento.

---

## **2 Gestión de Estado**

### **2.1 Estado Local**

- Mantén el estado local dentro del componente si no es necesario compartirlo.
- Usa `useState` para estados simples y `useReducer` para lógica más compleja.

```jsx
'use client'

import { useState } from 'react'

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Abrir Modal</button>
      {isOpen && <div>Contenido del Modal</div>}
    </div>
  )
}
```

---

### *2.2 Estado Global**

- Usa **Context API** para estados globales que no cambian frecuentemente (e.g., tema, idioma).
- Evita usar Context API para estados complejos o con actualizaciones frecuentes.
- Usa **Zustand** para estados globales reactivos y ligeros.
- Evita Redux Toolkit si no necesitas manejar estados complejos o lógica avanzada.

```jsx
'use client'

import create from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}))

export default function Counter() {
  const { count, increment, decrement } = useStore()

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={increment}>Incrementar</button>
      <button onClick={decrement}>Decrementar</button>
    </div>
  )
}
```

---

### **2.3 Estado de Servidor**

- Usa **SWR** o **React Query** para manejar datos remotos con caché, revalidación y sincronización automática.
- No almacenes datos remotos en estados globales como Context o Redux.

```tsx
'use client'

import { useQuery } from '@tanstack/react-query'

const fetchUsers = async () => {
  const res = await fetch('/api/users')
  if (!res.ok) throw new Error('Error al cargar los datos')
  return res.json()
}

export default function Users() {
  const { data, isLoading, error } = useQuery(['users'], fetchUsers)

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

---

### **2.4 Persistencia de Estado**

- Usa un hook personalizado con `localStorage` o `sessionStorage` para almacenar datos que deben persistir entre sesiones.

```tsx
'use client'

import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default function Preferences() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Cambiar Tema: {theme}
    </button>
  )
}
```

---

## **3 Seo**

El SEO (Search Engine Optimization) es crucial para mejorar la visibilidad de la aplicación en los motores de búsqueda. A continuación, se detallan las mejores prácticas para implementar SEO en proyectos frontend:

### **3.1 Metadatos**

- Usa el componente next/head para definir metadatos en cada página.
- Incluye etiquetas esenciales como title, meta description, y meta keywords.

```jsx
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Nombre de la Página | Nombre del Sitio</title>
        <meta name='description' content='Descripción breve de la página' />
        <meta name='keywords' content='palabra clave 1, palabra clave 2' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <main>
        <h1>Contenido de la página</h1>
      </main>
    </>
  )
}
```

### **3.2 Etiquetas Open Graph y Twitter Cards**

- Usa etiquetas Open Graph para optimizar cómo se comparte el contenido en redes sociales.
- Agrega etiquetas de Twitter Cards para mejorar la apariencia en Twitter.

```jsx
<Head>
  <meta property='og:title' content='Título de la Página' />
  <meta property='og:description' content='Descripción breve de la página' />
  <meta property='og:image' content='/images/og-image.jpg' />
  <meta property='og:url' content='https://www.ejemplo.com/pagina' />
  <meta property='og:type' content='website' />

  <meta name='twitter:card' content='summary_large_image' />
  <meta name='twitter:title' content='Título de la Página' />
  <meta name='twitter:description' content='Descripción breve de la página' />
  <meta name='twitter:image' content='/images/twitter-image.jpg' />
</Head>
```

### **3.3 Etiquetas de Encabezado**

- Usa etiquetas de encabezado (h1, h2, h3, etc.) de manera jerárquica.
- Evita caracteres especiales y palabras irrelevantes.

```html
<main>
  <h1>Título Principal</h1>
  <h2>Subtítulo</h2>
  <p>Contenido relacionado con el subtítulo.</p>
</main>
```

### **3.4 Sitemap y Robots.txt**

- Genera un archivo sitemap.xml para ayudar a los motores de búsqueda a indexar las páginas.
- Configura un archivo robots.txt para controlar qué páginas deben ser indexadas.

```jsx
module.exports = {
  siteUrl: 'https://www.ejemplo.com',
  generateRobotsTxt: true
}
```

### **3.5 Imágenes Optimizadas**

- Usa el componente next/image para optimizar imágenes automáticamente.
- Agrega atributos alt descriptivos para mejorar la accesibilidad y el SEO.

```jsx
import Image from 'next/image'
;<Image
  src='/images/ejemplo.jpg'
  alt='Descripción de la imagen'
  width={800}
  height={600}
  priority
/>
```

### **3.6 Accesibilidad**

- Usa atributos aria para mejorar la accesibilidad.
- Asegúrate de que todos los elementos interactivos sean accesibles mediante teclado.Agrega atributos alt descriptivos para mejorar la accesibilidad y el SEO.

```html
<button aria-label="Cerrar menú">X</button>
```

### **3.6 Etiquetas Canonical**

- Usa etiquetas rel="canonical" para evitar contenido duplicado.

```html
<head>
  <link rel="canonical" href="https://www.ejemplo.com/pagina" />
</head>
```
