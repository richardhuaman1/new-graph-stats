# Lineamientos de Desarrollo Frontend 🚀
Este documento establece los **lineamientos técnicos** que regirán el desarrollo de proyectos frontend en **Apuesta Total**. Estas directrices han sido definidas para garantizar la **consistencia**, **calidad** y **escalabilidad** en todos los proyectos. Cada lineamiento tiene un propósito técnico claro y está diseñado para alinear al equipo con las **mejores prácticas de la industria**.  

A continuación, se presenta el índice de los lineamientos, organizados por las siguientes áreas:
- Arquitectura del Proyecto  
- Organización del código  
- Lineamientos Javascript  
- Lineamientos Estilos CSS  
- Prácticas recomendadas  

## Índice 📋

1. [Arquitectura del Proyecto](#1-estructura-del-proyecto)  
   1.1 [Estructura de carpetas simplificada](#11-estructura-de-carpetas-simplificada)  
   1.2 [Estructura de carpetas detallada](#12-estructura-de-carpetas-detallada)  
   1.3 [Convención de nombres](#3-convención-de-nombres)  
2. [Organización del código](#2-organización-del-código)  
   2.1 [Aplicación de la Clean Architecture](#21-aplicación-de-la-clean-architecture)  
   2.2 [Archivos de organización](#22-archivos-de-organización)  
   2.2.1 [Definición de constantes, enumeradores e interfaces](#221-definición-de-constantes-enumeradores-e-interfaces)  
   2.2.2 [Consumo de servicios](#222-consumo-de-servicios)  
   2.2.3 [Centralizador de rutas](#223-centralizador-de-rutas)  
   2.2.4 [Adaptadores de datos](#224-adaptadores-de-datos)  
   2.2.5 [Declaración de fuentes](#225-declaración-de-fuentes)  
   2.2.6 [Declaración de funciones utilitarias](#226-declaración-de-funciones-utilitarias)  
   2.2.7 [Centralizador de validaciones](#227-centralizador-de-validaciones)
3. [Lineamientos Javascript](#3-lineamientos-javascript)  
   3.1 [Estilo de código](#31-estilo-de-código)  
   3.2 [JS Librerías Principales](#32-js-librerías-principales)  
   3.3 [Extensiones para VSCode](#33-extensiones-para-vscode)
4. [Lineamientos Estilos CSS](#4-aplicación-de-estilos-css)  
   4.1 [Archivo de configuración tailwind](#41-archivo-de-configuración-tailwind)  
   4.2 [Declaración de clases](#42-declaración-de-clases)
5. [Prácticas Recomendadas](https://repository.kurax.at/documentacion-frontend/guia-de-lineamientos-frontend/-/blob/main/recommended-practices.md)  
6. [Recursos adicionales](#6-recursos-adicionales)

## **1. Estructura del Proyecto** 🏗️
Para la estructura general, aplicaremos el concepto de [Screaming Architecture](#6-recursos-adicionales), priorizando el **core del negocio** y organizando los archivos según su **alcance**. Esta estructura se dividirá en dos enfoques, dependiendo de las necesidades y complejidad del proyecto.

### **1.1 Estructura de carpetas simplificada**
**Lineamiento:** **"Mantén la estructura simple en proyectos pequeños."**  
**Por qué:** Una estructura simplificada es ideal para proyectos pequeños o MVPs, donde la organización no requiere niveles profundos de separación. Esto mejora la accesibilidad y reduce la complejidad.  
**Ejemplo** A confinuación podemos observar la definición de un arbol de carpetas usando el app router de next como contenedor de los dominios del negocio home y registro.

```jsx
  src/
    ├── adapters/
    ├── components/
    ├── models/
    ├── hooks/
    ├── services/
    ├── utilities/
    ├── contexts/
    └── fonts/
    └── app/
        └── home/
        │   ├── components/
        │   │   └──HomeButton.jsx
        │   └── page.jsx
        └── registro/
            ├── components/
            │   └──StepOne.jsx
            │   └──SteTwo.jsx
            └── page.jsx
```

**Scope de los archivos:**
- **Carpetas como `adapters`, `models`, `hooks`, `services`, y `utilities`**: Estas contienen archivos globales que son aplicables a toda la aplicación.
- **`/app/home`**: Esta carpeta solo contiene los elementos esenciales para la página "home", como la lógica de la vista y un solo componente. No tiene carpetas adicionales para adaptar, modelar, ni más hooks o servicios específicos.

### **1.2 Estructura de carpetas detallada**
**Lineamiento:** **"Organiza de manera modular en proyectos grandes."**  
**Por qué:** En proyectos grandes, una estructura modular asegura escalabilidad y facilita el mantenimiento. Cada página o dominio debe tener sus propios recursos organizados.  
**Ejemplo** A continuación se presentan la definición de un arbol de carpetas con los dominios del negocio home y registro a diferencia de la estructura simplificada cada dominio tiene otras subcarpetas las cuales veremos a detalle en la siguiente sección. 

```jsx
  src/
    ├── adapters/
    ├── components/
    ├── models/
    ├── hooks/
    ├── services/
    ├── utilities/
    ├── contexts/
    ├── fonts/
    └── app/
        ├── home/
        │    ├── components/
        │    ├── models/
        │    ├── hooks/
        │    ├── services/
        │    ├── store/
        │    └── utilities/
        └── registro/
            ├── adapters/
            ├── components/
            └── models/
```

**Scope de los archivos:**
- **`/adapters`, `/components`, `/hooks`, `/services`, `/utilities`**: Aquí se incluye la estructura básica, pero para proyectos más grandes o complejos, cada dominio puede contener más carpetas de organización.
- **`/app/home`**: En la estructura detallada, cada página tiene su propia subcarpeta que organiza adaptadores, componentes, hooks, servicios y utilidades de manera más granular. Esto permite una mayor organización y un código más modular.

### **1.3 Convención de nombres** 
**Lineamiento:** **"Usa nombres claros y consistentes para cada tipo de archivo."**  
**Por qué:** Los nombres claros y consistentes en ingles hacen que el código sea más legible y fácil de mantener y mantener un standard nos ayuda a poder organizarnos mejor y ubicarlos mas facilmente.  
**Ejemplo** A continuación se detallan los tipos de archivos y carpetas que existen en un proyecto

- **Carpetas**: `kebab-case` (ejemplo: `registro-usuario`).  
- **Archivos de ts**: `camelCase` (ejemplo: `userService.service.ts`).  
- **Componentes tsx**: `PascalCase` (ejemplo: `UserComponent.jsx`).

**Prefijos Contextuales:** Los archivos dentro de las capertas contenedoras como `fonts, models, services, adapters ` deben llevar el nombre de su carpeta contenedora como sufijo (ejemplo: `characters.service.ts`, `character.adapter.ts`, `verdana.font.ts`, `character.model.ts` ).

## **2. Organización del Código** 📂
Para definir una arquitectura para projectos frontend se debe tener en mente la **Separación de responsabilidades** para que el proyecto sea fácil de mantener
**Por qué:** extender y comprender usando distintas capas para organizar las lógicas de nuestra aplicación.

### **2.1 Aplicación de la Clean Architecture**
**Lineamiento:** **"Cada capa debe cumplir un propósito específico y estar claramente definida, dividiéndose en entidades, casos de uso, adaptadores y la capa externa, organizadas dentro de un dominio para garantizar la separación de responsabilidades y la escalabilidad del proyecto."**  
**Por qué:** Hemos adoptado la [Clean Architecture](#6-recursos-adicionales) como referencia debido a su simplicidad en la definición de carpetas, lo que facilita su adopción por parte de distintos equipos. Además, esta arquitectura es altamente escalable, lo que la hace adecuada para proyectos de mayor envergadura.  
**Ejemplo:** A continuación, se presenta un ejemplo de cómo las carpetas pueden agruparse en distintas capas para reflejar el enfoque lógico de la **Clean Architecture**. Este diagrama es solo una representación simplificada y no refleja la estructura visual exacta del proyecto, sino que está diseñado para ilustrar las capas conceptuales.

```jsx
  domain/
    ├── useCases/
    │   ├── hooks/
    │   │   └── useFetchData.ts
    │   │   └── useFormValidation.ts
    │   ├── store/
    │   │   └── userStore.ts
    ├── adapters/
    │   ├── adapters/
    │   │   ├── character.adapter.ts
    │   │   ├── user.adapter.ts
    ├── entities/
    │   ├── models/
    │   │   └── character.model.ts
    │   │   └── user.model.ts
    ├── external/
    │   ├── services/
    │   │   └── character.service.ts
    │   │   └── auth.service.ts
    │   ├── utilities/
    │   │   └── formatDate.ts
    │   │   └── parseUbigeo.ts
    │   ├── components/
    │   │   └── Button.tsx
    │   │   └── Modal.tsx
```
**`models/`**:
   - Contiene archivos que definen las estructuras de datos y modelos utilizados en la aplicación.
   - Los modelos deben ser independientes de las vistas y deben ser reutilizables dentro de su contexto.
   
**`app/*`**:
   - Aquí se deben colocar las páginas principales de la aplicación que tambien cumplirian la función de un dominio

**`components/`**:
   - Almacena componentes reutilizables a nivel global.
   - Cada componente debe ser independiente, sin dependencias de estado o lógica específica de una página o funcionalidad.

**`store/`**:
  - Manejo del estado global/local: Contiene la lógica para gestionar el estado de la aplicación, ya sea con herramientas como Redux, Zustand, o Context API.
  - Desacoplamiento: El estado debe estar separado de los componentes para facilitar su reutilización y mantenimiento.

**`hooks/`**:
   - Deben seguir el principio de reutilización y mantenerse lo más desacoplados posible.

**`services/`**:
   - Guarda la lógica que interactúa con APIs, bases de datos o servicios externos.
   - Los servicios deben ser diseñados para ser reutilizables y seguir principios como la inyección de dependencias y el manejo adecuado de errores.

**`utilities/`**:
   - Contiene funciones auxiliares y utilitarias que no están directamente relacionadas con los componentes pero son necesarias en varias partes de la aplicación, como funciones de formato, validación, etc.

**`adapters/`**:
   - Contiene funciones o clases que transforman datos entre diferentes capas o formatos.

### **2.2 Archivos de organización**
A continuación, se presentan ejemplos de los diferentes tipos de archivos y su ubicación dentro de la estructura del proyecto, organizados según su propósito y funcionalidad.

### **2.2.1 Definición de constantes, enumeradores e interfaces** 
**Lineamiento:** **"Centraliza las definiciones de datos dentro de la carpeta models."**  

- **`/src/models/character.model.ts`**: ejemplo de archivo que va dentro de la carpeta models pueden ser constantes, esquemas de validaciónes, enumeradores e interfaces.

```jsx
  export interface Origin {
    name: string
    url: string
  }

  export interface Character {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: Origin
    location: Origin
    image: string
    episode: string[]
    url: string
    created: string
  }

  export interface CardData {
    id: string
    name: string
    type?: string
    created: string
    image?: string
  }
```

### **2.2.2 Consumo de servicios, conexión con fuentes externas** 
**Lineamiento:** **"Separa la lógica de negocio de las capas de comunicación externa"**  

- **`src/services/character.service.ts`**: ejemplo de un archivo dentro de la carpeta services realizando la petición de un servicio externo

```jsx
  import { Character } from '../models/character.model'

  const url = process.env.SERVICE_BACKEND_URL

  if (!url) {
    throw new Error(
      'SERVICE_BACKEND_URL no está definido en las variables de entorno'
    )
  }

  export const getCharacters = async (): Promise<Character[]> => {
    try {
      const response = await fetch(`${url}/character`)

      if (!response.ok) {
        throw new Error(
          `Error al obtener los personajes: ${response.status} ${response.statusText}`
        )
      }

      const data = await response.json()

      if (!data.results) {
        throw new Error('La respuesta de la API no contiene el campo "results"')
      }

      return data.results
    } catch (error) {
      console.error('Error en getCharacters:', error)
      throw error
    }
  }
```

### **2.2.3 Definición de constantes para las rutas** 
**Lineamiento:** **"Evita duplicar rutas en múltiples lugares."**  

- **`/src/utilities/route.ts`**: este es el archivo donde se encuentran centralizados todos los nombres de las rutas de toda la aplicación.

```jsx
  export const Routes = {
    LOGIN: {
      path: '/',
      name: 'Login'
    },
    GAME: {
      path: '/game',
      name: 'Game'
    }
  }

  export interface Route {
    path: string;
    name: string;
  }
```

### **2.2.4 Declaración de fuentes** 
**Lineamiento:** **"Centraliza la configuración tipográfica."**  

- **`/src/fonts/rubik.fonts.ts`**: en este archivo se define el uso todas las fuentes a usar en la aplicación para facilitar cambios globales y asegura consistencia en el diseño.

```jsx
  import localFont from 'next/font/local'
  const RubikFont = localFont({
    src: [
      {
        path: '../fonts/Rubik-Light.woff2',
        weight: '300',
        style: 'normal'
      },
      {
        path: '../fonts/Rubik-Regular.woff2',
        weight: '400',
        style: 'normal'
      },
      {
        path: '../fonts/Rubik-Medium.ttf',
        weight: '500',
        style: 'normal'
      }
    ],
    variable: '--font-sans'
  })

  export default RubikFont
```

### **2.2.5 Adaptadores de datos**
**Lineamiento:** **"Transforma los datos de la capa externa para poder usarlos en las demas capas de negocio"**  

- **`/src/adapters/character.adapter.ts`**: ejemplo de como se deben definir los adaptadores de datos de entrada y salida de las Apis con las variables de la aplicación.
Los adaptadores aseguran que los datos de las APIs sean consistentes con los requerimientos de la aplicación.

```jsx
  import { formatDate } from '@/utilities/utils'
  import { Character, CardData } from './character.model'

  const characterAdapter = (data: Character[] | null | undefined): CardData[] => {
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('El adaptador recibió datos inválidos o vacíos.')
      return []
    }

    return data.map((character) => ({
      id: String(character.id ?? '0'),
      name: character.name?.trim() || 'Sin nombre',
      type: character.type?.trim() || 'Sin tipo',
      created: character.created
        ? formatDate(character.created)
        : 'Fecha no disponible',
      image: character.image || '/images/default-character.png' // Imagen predeterminada
    }))
  }

  export { characterAdapter }
```

### **2.2.6 Declaración de funciones utilitarias**
**Lineamiento:** **"Reutiliza funciones auxiliares."**  

- **`/src/utilities/utils.ts`**: ejemplo de archivo con funciones utilitarias para formatear valores de precios y ubigeos.

```jsx
  export const formatFloat = (value: number | null, hidden = false): string => {
    const parsedNumber = value ?? 0
    const formatted = parsedNumber.toLocaleString('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return hidden ? formatted : formatted.replace(/./g, '*')
  }

  export const parseUbigeo = (ubigeo: string) => {
    if (ubigeo.length !== 6) {
      return null // Retorna null si el código no es válido
    }

    const departamento = ubigeo.slice(0, 2)
    const provincia = ubigeo.slice(2, 4)
    const distrito = ubigeo.slice(4, 6)

    return { departamento, provincia, distrito }
  }
```

### **2.2.7 Validaciones de formularios**
**Lineamiento:** **"Implementa una capa intermedia entre la libreria de componentes y tus validaciones centralizando todos los tipos de formulario en un solo componente."**  

- **`/src/components/customFormField`**: archivo que centraliza los componentes de formulario visuales con el validador de schemas zod y React hook form.
Centralizar las validaciones con herramientas como Zod y React Hook Form asegura que los formularios sean robustos y fáciles de mantener siguiendo el principio SOLID de inversión de dependencias desacoplando el validador de schemas con los componentes visuales de tipo formulario.

```jsx
  'use client';

  import React from 'react';
  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form';
  import { Input } from '@/components/ui/input';
  import { Control } from 'react-hook-form';
  import Image from 'next/image';
  import { PasswordInput } from '@/components/forms/PasswordInput';

  export enum FormFieldType {
    INPUT = 'input',
    PASSWORD = 'password',
    SKELETON = 'skeleton',
  }

  interface Props {
    control: Control<any>;
    fieldType: FormFieldType;
    name: string;
    label?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    placeholder?: string;
    renderSkeleton?: (field: any) => React.ReactNode;
  }

  const RenderField: React.FC<{ field: any; props: Props }> = ({ field, props }) => {
    const { fieldType, iconSrc, iconAlt, placeholder, renderSkeleton } = props;

    if (fieldType === FormFieldType.INPUT) {
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              alt={iconAlt || 'icon'}
              width={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    }

    if (fieldType === FormFieldType.SKELETON) {
      return renderSkeleton ? renderSkeleton(field) : null;
    }

    if (fieldType === FormFieldType.PASSWORD) {
      return (
        <div className="rounded-md border border-dark-500 bg-dark-400">
          <FormControl>
            <PasswordInput
              placeholder={placeholder}
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
        </div>
      );
    }

    return <Input type="text" placeholder="Ej. Juan Pérez" />;
  };

  const CustomFormField: React.FC<Props> = ({
    control,
    fieldType,
    name,
    label,
    ...props
  }) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <RenderField field={field} props={{ control, fieldType, name, label, ...props }} />
            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    );
  };

  export default CustomFormField;

```

## **3. Lineamientos escritura código Javascript** 💻
A continuación, se detallan los lineamientos relacionados con la escritura de código JavaScript y la selección de librerías estándar, enfocándonos en mantener un desarrollo eficiente, consistente y alineado con las mejores prácticas de la industria.

### **3.1. Estilo de código**
**Lineamiento:** **"Escribe código limpio y consistente."**  
Seguir la guía de estilo de [standardJS](#6-recursos-adicionales) y usar herramientas como Prettier y ESLint asegura que el código sea legible y fácil de mantener.

- **Guía de Estilo:** Seguir la guía de estilo de StandardJS para mantener consistencia en el código.
- **Configuración de Prettier:** Configurar para formatear automáticamente el código según los lineamientos.
- **Configuración de ESLint:** Configurar para detectar errores y mantener buenas prácticas.

### **3.2 JS Librerías Principales**
**Lineamiento:** **"Usa herramientas modernas y eficientes considerando la comunidad, la documentación y el soporte de incidencias reportadas en su github"**  
Librerías como Tailwind CSS, Zod y Next.js están alineadas con los estándares actuales y mejoran la productividad.

- **UI**: ShadCN para componentes preconstruidos y personalizables de bajo nivel te da mas libertad.
- **Validaciones**: Zod para validaciones de datos por medio de esquemas de validación.
- **Consumo de APIs**: `fetch` nativo de Next.js o un wrapper personalizado en el servidor o swr con axios en el cliente.
- **CSS**: Tailwind CSS como framework principal de estilos.
- **Framework**: Next.js como base del proyecto.

### **3.3. Extensiones para VSCode**
**Lineamiento:** **"Configura tu entorno de desarrollo correctamente."**  
Extensiones como Prettier, ESLint y Tailwind CSS IntelliSense mejoran la productividad y reducen errores.

- **Prettier - Code formatter**: Formateo automático del código.
- **ESLint**: Detecta errores y aplica reglas de estilo.
- **Error Lens**: Muestra errores de ESLint directamente en el editor.
- **Tailwind CSS IntelliSense**: Autocompletado y validación de clases de Tailwind.
- **PostCSS Language Support**: Soporte para sintaxis moderna de CSS.

## **4. Aplicación de Estilos CSS** 🎨

Para la aplicación de estilos, utilizaremos **Tailwind CSS v4**, que centraliza la configuración directamente en el archivo CSS en lugar de usar un archivo `tailwind.config.css`. Esto permite una personalización más directa y simplificada.

### **4.1 Uso de Tailwind CSS**
**Lineamiento:** **"Aprovecha las clases utilitarias de Tailwind CSS para mantener un código limpio y consistente."**

- **Clases Utilitarias:**  
  Los estilos deben ser manejados principalmente mediante **clases de Tailwind CSS** directamente en los componentes. Esto asegura un diseño modular y fácil de mantener.
  
- **Evitar Estilos Inline:**  
  Evita el uso de estilos en línea (`style={{}}`) salvo en casos excepcionales, como estilos dinámicos que dependen de cálculos en tiempo de ejecución.

- **Clases Personalizadas:**  
  Si los estilos son demasiado extensos o complejos para ser manejados directamente en los componentes, deben declararse en el archivo `tailwind.css` bajo las capas específicas de **@layer**.


### **4.2 Organización de Clases Personalizadas**
**Lineamiento:** **"Organiza las clases personalizadas en capas para mantener un diseño estructurado y reutilizable."**

Tailwind CSS v4 permite definir clases personalizadas directamente en el archivo CSS utilizando las siguientes capas:

1. **`@layer base`:**  
   Para definir variables globales y estilos base que afectan elementos HTML directamente (e.g., `body`, `h1`, `p`).
   
   **Ejemplo:**
   ```css
   @layer base {
     :root {
       --background: 0 0% 100%;
       --foreground: 0 0% 3.9%;
       --primary: #51bb27;
       --secondary: #f8f9fa;
     }

     body {
       @apply bg-gray-100 text-gray-900;
     }

     body::-webkit-scrollbar {
       width: 10px;
     }

     body::-webkit-scrollbar-thumb {
       @apply bg-gray-300 rounded-lg hover:bg-gray-400;
     }
   }
   ```
2. **`@layer components`:**  
   Para definir clases personalizadas que representan componentes reutilizables (e.g., botones, inputs, tarjetas).
   
   **Ejemplo:**
   ```css
   @layer components {
      .btn-primary {
        @apply bg-primary text-white py-2 px-4 rounded hover:bg-green-600;
      }

      .card {
        @apply bg-white shadow-md rounded-lg p-4;
      }
    }
    ```
3. **`@layer utilities`:**  
   Para definir clases utilitarias personalizadas que encapsulan estilos específicos y reutilizables.
   
   **Ejemplo:**
   ```css
   @layer utilities {
    .text-shadow {
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .border-gradient {
      border-image: linear-gradient(to right, #51bb27, #f8f9fa) 1;
    }
   }
   ```


### **4.3 Archivo de Configuración en CSS**
**Lineamiento:** **"Centraliza la configuración de estilos directamente en el archivo CSS."**

En Tailwind CSS v4, la configuración se realiza directamente en el archivo CSS mediante las directivas **@theme**. Esto incluye colores, tipografía, espaciados, animaciones, y más.

**Ejemplo de configuración:**

   ```css
    @import 'tailwindcss';
    @import 'tw-animate-css';

    @theme {
      --font-display: "Satoshi", "sans-serif";
      --breakpoint-3xl: 120rem;
      --color-primary: #51bb27;
      --color-secondary: #f8f9fa;
      --radius-lg: 12px;
      --radius-xl: 16px;
    }

    @theme inline {
      --radius-sm: calc(var(--radius-lg) - 4px);
      --radius-md: calc(var(--radius-lg) - 2px);
      --color-background: var(--color-primary);
      --color-foreground: var(--color-secondary);
    }
   ```
   
## **5. Practicas recomendadas** ✅
**Lineamiento:** **"Aplica las mejores prácticas de la industria."**  
Seguir prácticas recomendadas asegura que las aplicaciones sean robustas, escalables y fáciles de mantener.

Siguiendo estas [recomendaciones](https://repository.kurax.at/documentacion-frontend/guia-de-lineamientos-frontend/-/blob/main/recommended-practices.md), buscamos construir aplicaciones robustas, fáciles de mantener y que brinden una experiencia excepcional a nuestros usuarios.

### **6. Recursos adicionales**
- [StandardJS](https://standardjs.com/)
- [Clean Architecture](https://medium.com/@diego.coder/introducci%C3%B3n-a-las-clean-architectures-723fe9fe17fa)
- [Screaming Architecture](https://medium.com/all-you-need-is-clean-code/screaming-architecture-a2cd25fe3eec)
- [Guía Clean Code](https://slides.com/diegorodrigosamamesalazar/deck/fullscreen)
- [Guía de Estimación FrontEnd](https://apuestatotal.atlassian.net/wiki/spaces/~7120202c7fea795188492b9c16d48521877faa/pages/107970571/Gu+a+de+Estimaci+n+Frontend)
