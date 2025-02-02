# Usar Node.js para construir la app
FROM node:18 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto y construir la app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Usar Nginx para servir la aplicación
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Configurar Nginx para trabajar con React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
