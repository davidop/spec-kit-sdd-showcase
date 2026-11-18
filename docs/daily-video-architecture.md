# Daily Tech Video Factory — arquitectura v0.1

## Objetivo
Crear un vídeo vertical diario a partir del contenido editorial **Resumen Tech Diario**, con revisión humana previa a publicación. El resumen es la fuente editorial; un crawler RSS independiente **no** es equivalente.

## Pipeline
1. **Ingesta**: exportar el resultado editorial a `content/daily/YYYY-MM-DD.json`.
2. **Verificación**: validar enlaces, fecha, atribución y diferencias entre capacidades GA/preview/comunidad. Sin evidencia, no generar afirmaciones categóricas.
3. **Selección**: puntuar novedad, relevancia para Microsoft Cloud/IA, profundidad demostrable y riesgo de repetición respecto a publicaciones anteriores.
4. **Guion**: 60–90 s; separar hechos, análisis y demo simulada.
5. **Producción**: Remotion/React/Three.js + locución es-ES + subtítulos derivados de la locución + mezcla.
6. **QA**: JSON schema, atribución, 1080×1920, H.264, yuv420p, 30 fps, duración, pista de audio, SRT, safe areas.
7. **Entrega**: artifact de GitHub Actions; nunca autopublicar sin aprobación.

## Decisiones de integración pendientes
GitHub Actions no tiene acceso nativo a la conversación de ChatGPT. Se requiere un puente autorizado para depositar el JSON en el repositorio (p. ej. tarea conectada con permisos de GitHub, integración API o exportación manual como fallback). No prometer un vídeo diario automático hasta probar el puente.

## Seguridad y costes
- Tokens/TTS API en GitHub Actions Secrets, nunca en el repositorio ni en logs.
- Permisos mínimos: contents:read para render; contents:write únicamente en workflow que deba crear contenido.
- Concurrency para evitar renders solapados.
- Retención limitada de artefactos y límites de minutos de Actions.
- Voz, música, logos e imágenes sujetos a licencias verificadas.
- Si faltan fuentes o hay riesgo de repetición, detener la publicación y pedir revisión.

## Versionado
Separar el showcase original de Spec Kit de la nueva fábrica: `src/showcase.tsx` se mantiene, la nueva composición consumirá JSON validado.
