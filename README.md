# Spec Kit · SDD Showcase

Vídeo técnico vertical de **90 segundos** sobre GitHub Spec Kit 1.4.1 y Spec-Driven Development aplicado a un cotizador de seguros de hogar.

> **Estado:** proyecto audiovisual en construcción. Las interfaces, ejecuciones, pruebas y resultados mostrados son recreaciones didácticas; no constituyen evidencia de ejecución real.

## Dirección creativa
- 1080 × 1920 (9:16), 30 fps, duración objetivo 90 s
- Microsoft Fluent 2 Hybrid: escenas claras para novedades y oscuras para arquitectura/código
- Narración masculina, español de España; subtítulos sincronizados y música discreta
- Arquitectura: repositorios independientes para **API .NET**, **frontend React** e **infraestructura Terraform/Azure**
- GitHub Copilot, Claude Code y OpenAI Codex se presentan como **alternativas**, no como agentes que colaboran automáticamente
- Cierre: **Microsoft MVP · David Oliva**

## Primer render de prueba
```bash
npm install
npm run preview
npm run render
```
Requiere Node.js 20+ y FFmpeg disponible para exportación en el entorno Remotion. El render inicial es un **animatic sin locución**, no el vídeo definitivo.

## Estructura
- `src/`: composición y escenas Remotion
- `docs/storyboard.md`: narrativa y tiempos
- `docs/verification.md`: criterios de verificación técnica
- `docs/production.md`: tareas pendientes para producción final
- `public/`: recursos audiovisuales con licencia compatible, cuando se incorporen

## Integridad técnica
Las novedades concretas de Spec Kit 1.4.1 deben contrastarse con su changelog oficial antes de grabar la narración. No se atribuirán a Spec Kit capacidades nativas de coordinación automática multi-repositorio sin documentación oficial.
