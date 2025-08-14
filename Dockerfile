# Usamos una imagen oficial de Nginx como base. Es un servidor web ligero y eficiente.
FROM nginx:alpine

# Copiamos el contenido de nuestra carpeta local (el index.html)
# al directorio donde Nginx sirve los archivos por defecto en el contenedor.
COPY ./ /usr/share/nginx/html
