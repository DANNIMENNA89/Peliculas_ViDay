# Imagen base
FROM python:3.12.3

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar Pipfile y Pipfile.lock
COPY Pipfile Pipfile.lock /app/

# Instalar pipenv
RUN pip install pipenv

# Instalar dependencias del proyecto
RUN pipenv install --deploy --system

# Copiar el resto de la aplicación
COPY . /app

# Exponer el puerto en el que correrá la aplicación
EXPOSE 8000

# Comando para correr la aplicación
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
