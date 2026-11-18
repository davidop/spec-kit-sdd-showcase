# Caso de uso aprobado: cobertura opcional de daños por agua

**Escenario ficticio para una demostración audiovisual.** No se presenta como código desplegado ni validado.

## Historia de usuario
Como cliente que contrata un seguro de hogar, quiero activar una cobertura opcional de daños por agua y conocer el incremento de prima antes de confirmar mi presupuesto.

## Criterios de aceptación (propuestos)
- El frontend React muestra una opción clara para activar o desactivar la cobertura.
- La API .NET recibe la selección y devuelve el desglose de prima base, suplemento y total.
- El cálculo de prima se realiza en servidor; el frontend solo presenta los importes devueltos.
- El contrato API documenta la opción y el desglose; se contemplan errores de entrada y redondeo monetario.
- Los tests cubren cobertura activada/desactivada, importes, validación y compatibilidad.
- Azure/Terraform **solo** cambia cuando se justifica una necesidad operativa, por ejemplo una regla de alerta o configuración de telemetría.

## Contrato ilustrativo
```json
{
  "propertyId": "HOME-001",
  "optionalCoverages": { "waterDamage": true }
}
```
Respuesta de ejemplo **inventada para el storyboard**:
```json
{
  "currency": "EUR",
  "basePremium": 240.00,
  "waterDamageSupplement": 28.00,
  "totalPremium": 268.00
}
```
Los importes son ficticios y no representan una tarifa aseguradora real.

## Tres repositorios ficticios
1. `home-quote-api` — ASP.NET Core, endpoint de cotización, reglas, tests.
2. `home-quote-web` — React, selector, desglose y tests UI.
3. `home-quote-infra` — Terraform/Azure, observabilidad si procede.

## Recorrido de cámara
Especificación → contrato API → diff React → diff .NET → observabilidad Terraform → pull request → Quality Gates simulados → zoom-out 3D.

## Restricción de veracidad
GitHub Copilot, Claude Code y OpenAI Codex se muestran como **alternativas** para implementar la especificación. No se simula una coordinación autónoma real entre ellos.
