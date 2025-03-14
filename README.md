# GASP-REACT-TEMPLATE

Este es un template para utilizar **Vite con React en Google Apps Script**. 

## 📌 Configuración Inicial

### 1️⃣ Clonar el Repositorio

```sh
git clone https://github.com/EduardoNiquin/GASP-REACT-TEMPLATE.git
cd GASP-REACT-TEMPLATE
```

### 2️⃣ Configurar `appsscript.json`

Debes reemplazar el contenido del archivo **appsscript.json** con el de tu proyecto de Google Apps Script.

### 3️⃣ Configurar `.clasp.json`

En el archivo **.clasp.json**, debes colocar el **ID de tu proyecto** de Google Apps Script.

## 📦 Instalación de Dependencias

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```sh
npm install
```

Además, instala **clasp** de Google Apps Script globalmente si no lo tienes:

```sh
npm install -g @google/clasp
```

## 🔑 Autenticación con Google Apps Script

Para poder desplegar el código en Google Apps Script, debes autenticarte con `clasp`:

```sh
clasp login
```

Si es la primera vez que lo usas, deberás otorgar permisos a clasp para gestionar tus proyectos de Apps Script.

## 🚀 Desplegar Proyecto

Para desplegar el proyecto en Google Apps Script, simplemente ejecuta:

```sh
npm run deploy
```

Este comando realizará las siguientes acciones:

1. **Compilar el código con Vite** (`vite build`).
2. **Generar los archivos embebidos** (`node inline.js`).
3. **Copiar `appsscript.json` y `code.js` al directorio `gas/`**.
4. **Subir los archivos a Google Apps Script** (`clasp push`).

Una vez desplegado, puedes ejecutar la aplicación directamente desde Google Apps Script.

## ✨ ¡Listo para Usar!

Ahora puedes abrir tu proyecto en Google Apps Script y ejecutarlo sin problemas. 🚀

---

💡 **Notas:**
- Si encuentras algún problema, revisa que `clasp` esté correctamente instalado y autenticado.
- Recuerda que los archivos `js.html` y `css.html` se generan automáticamente en cada despliegue.

---

📌 **Autor:** [EduardoNiquin](https://github.com/EduardoNiquin)
