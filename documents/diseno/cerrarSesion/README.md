# 25-26-idsw2-sdVC > cerrarSesion > Diseño

## Información del artefacto

| Campo | Valor |
|-------|-------|
| **Proyecto** | Sistema de Gestión de Exámenes Universitarios |
| **Fase RUP** | Elaboración |
| **Disciplina** | Diseño |
| **Versión** | 1.0 (NestJS + Vue 3) |
| **Fecha** | 2026-06-09 |
| **Autor** | Equipo de desarrollo |

## Propósito

Cerrar la sesión del usuario eliminando el token JWT del almacenamiento local y redirigiendo a la pantalla de login.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: cerrarSesion()](../../../images/diseno/cerrarSesion/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseno/cerrarSesion/secuencia.puml)|

</div>

## Participantes

| Componente | Responsabilidad |
|---|---|
| **MainLayout (Toolbar)** | Botón "Cerrar sesión". |
| **AuthStore (Pinia)** | Limpia estado y localStorage. |
| **Router** | Redirige a /login. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Sin llamada al backend** | JWT es stateless; basta eliminar el token local. |
| **localStorage.removeItem** | Elimina token persistido. |
| **Redirección a /login** | Router guard protege rutas internas. |
