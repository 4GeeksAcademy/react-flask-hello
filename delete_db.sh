#!/bin/bash
# Script para realizar un reseteo completo de Flask-Migrate y ejecutar la primera migración
# Corregido para evitar errores de transacción con DROP DATABASE

echo "=== RESET COMPLETO Y MIGRACIÓN INICIAL CON DEPURACIÓN ==="
echo "Este script realizará una limpieza completa y creará una migración inicial."
echo ""
read -p "¿Deseas continuar? (s/n): " confirm

if [ "$confirm" != "s" ]; then
    echo "Operación cancelada"
    exit 1
fi

# 1. Eliminar la base de datos completamente (fuera de una transacción)
echo ""
echo "=== ELIMINANDO LA BASE DE DATOS ==="

# Terminar conexiones a la base de datos - separado del DROP DATABASE
PGPASSWORD=postgres psql -h localhost -U gitpod -d postgres -c "
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE datname = 'example' AND pid <> pg_backend_pid();"

# Ejecutar DROP DATABASE sin usar transacciones
PGPASSWORD=postgres psql -h localhost -U gitpod -d postgres --command="DROP DATABASE IF EXISTS example;" || { echo "Error al eliminar la base de datos"; }

# Crear la base de datos de nuevo
PGPASSWORD=postgres psql -h localhost -U gitpod -d postgres --command="CREATE DATABASE example;" || { echo "Error al crear la base de datos"; exit 1; }

echo "✅ Base de datos eliminada y recreada"

# 2. Eliminar carpeta de migraciones y todos los __pycache__
echo ""
echo "=== ELIMINANDO CARPETAS DE MIGRACIONES Y CACHÉ ==="
find . -type d -name migrations -exec rm -rf {} \; 2>/dev/null || true
find . -type d -name __pycache__ -exec rm -rf {} \; 2>/dev/null || true
find . -name "*.pyc" -delete 2>/dev/null || true

echo "✅ Limpieza de archivos completada"

# 3. Crear un archivo temporal con información de depuración
debug_file="flask_migration_debug.log"
echo "=== LOG DE DEPURACIÓN: $(date) ===" > $debug_file

# 4. Exportar variables de entorno para depuración
export FLASK_DEBUG=1
export PYTHONDONTWRITEBYTECODE=1

# 5. Guardar información del entorno
echo "" >> $debug_file
echo "=== INFORMACIÓN DEL ENTORNO ===" >> $debug_file
echo "Directorio actual: $(pwd)" >> $debug_file
echo "Usuario: $(whoami)" >> $debug_file
echo "Python: $(which python)" >> $debug_file
echo "Pipenv: $(which pipenv)" >> $debug_file
echo "Flask: $(which flask)" >> $debug_file
echo "" >> $debug_file

# 6. Listar archivos importantes del proyecto
echo "=== ARCHIVOS DEL PROYECTO ===" >> $debug_file
echo "Archivos Python principales:" >> $debug_file
find . -maxdepth 2 -name "*.py" | sort >> $debug_file
echo "" >> $debug_file

# 7. Intentar detectar automáticamente el archivo principal de Flask
flask_app=""
if [ -f "./app.py" ]; then
    flask_app="app.py"
elif [ -f "./application.py" ]; then
    flask_app="application.py"
elif [ -f "./main.py" ]; then
    flask_app="main.py"
elif [ -f "./server.py" ]; then
    flask_app="server.py"
elif [ -f "./src/app.py" ]; then
    flask_app="src/app.py"
elif [ -f "./api/app.py" ]; then
    flask_app="api/app.py"
fi

if [ -n "$flask_app" ]; then
    echo "Detectado archivo principal de Flask: $flask_app" >> $debug_file
    export FLASK_APP=$flask_app
else
    echo "⚠️ No se pudo detectar automáticamente el archivo principal de Flask" >> $debug_file
    echo "⚠️ No se pudo detectar automáticamente el archivo principal de Flask"
    read -p "Por favor, ingresa el nombre del archivo principal (ej: app.py): " flask_app
    export FLASK_APP=$flask_app
fi

echo "FLASK_APP definido como: $FLASK_APP" >> $debug_file
echo "FLASK_APP definido como: $FLASK_APP"

# 8. Intentar inicializar el sistema de migraciones
echo ""
echo "=== INICIALIZANDO SISTEMA DE MIGRACIONES ==="
echo "=== INICIALIZANDO SISTEMA DE MIGRACIONES ===" >> $debug_file
echo "Ejecutando: FLASK_APP=$FLASK_APP pipenv run flask db init" >> $debug_file
FLASK_APP=$FLASK_APP pipenv run flask db init 2>&1 | tee -a $debug_file

if [ ${PIPESTATUS[0]} -ne 0 ]; then
    echo "❌ Error al inicializar el sistema de migraciones"
    echo "Revisa el archivo $debug_file para más detalles"
    
    # Mostrar contenido del archivo env.py si existe
    if [ -f "./migrations/env.py" ]; then
        echo "Contenido de migrations/env.py:" >> $debug_file
        cat ./migrations/env.py >> $debug_file
    fi
    
    exit 1
fi

echo "✅ Sistema de migraciones inicializado"

# 9. Crear la migración inicial
echo ""
echo "=== CREANDO MIGRACIÓN INICIAL ==="
echo "=== CREANDO MIGRACIÓN INICIAL ===" >> $debug_file
echo "Ejecutando: FLASK_APP=$FLASK_APP FLASK_DEBUG=1 pipenv run flask db migrate -m \"initial migration\"" >> $debug_file
FLASK_APP=$FLASK_APP FLASK_DEBUG=1 pipenv run flask db migrate -m "initial migration" 2>&1 | tee -a $debug_file

if [ ${PIPESTATUS[0]} -ne 0 ]; then
    echo "❌ Error al crear la migración inicial"
    echo "Revisa el archivo $debug_file para más detalles"
    
    # Información adicional para debug
    echo "Información adicional para debug:" >> $debug_file
    echo "Contenido de la carpeta migrations:" >> $debug_file
    find ./migrations -type f | sort >> $debug_file
    
    # Verificar errores comunes
    echo "Verificando errores comunes:" >> $debug_file
    grep -r "No such revision" ./migrations 2>/dev/null >> $debug_file || echo "No se encontró error de revisión" >> $debug_file
    
    exit 1
fi

echo "✅ Migración inicial creada"

# 10. Intentar aplicar la migración
echo ""
echo "=== APLICANDO MIGRACIÓN ==="
echo "=== APLICANDO MIGRACIÓN ===" >> $debug_file
echo "Ejecutando: FLASK_APP=$FLASK_APP pipenv run flask db upgrade" >> $debug_file
FLASK_APP=$FLASK_APP pipenv run flask db upgrade 2>&1 | tee -a $debug_file

if [ ${PIPESTATUS[0]} -ne 0 ]; then
    echo "❌ Error al aplicar la migración"
    echo "Revisa el archivo $debug_file para más detalles"
    exit 1
fi

echo "✅ Migración aplicada correctamente"

# 11. Verificar el estado de la base de datos
echo ""
echo "=== VERIFICANDO BASE DE DATOS ===" 
echo "=== VERIFICANDO BASE DE DATOS ===" >> $debug_file
echo "Tablas en la base de datos:" >> $debug_file
PGPASSWORD=postgres psql -h localhost -U gitpod -d example -c "\dt" 2>&1 | tee -a $debug_file

echo ""
echo "Contenido de la tabla alembic_version:" >> $debug_file
PGPASSWORD=postgres psql -h localhost -U gitpod -d example -c "SELECT * FROM alembic_version;" 2>&1 | tee -a $debug_file

# 12. Mostrar resultado final
echo ""
echo "=== PROCESO COMPLETADO ==="
echo "✅ Reset completo y migración inicial realizada"
echo "📝 Log de depuración guardado en: $debug_file"
echo ""
echo "Si necesitas revisar los mensajes de error o advertencias:"
echo "cat $debug_file"