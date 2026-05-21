# Artefactos obligatorios

Todo cambio debe mantener la estructura de artefactos definida en el README.md:

||||
|-|-|-|
|0|**`QUE_HADE.md`**|En el primer commit. Luego no se modifica.|
|1|**README.md**|Este archivo, reescrito con la presentación del sistema construido.|
|2|Código fuente|`/src`, o `/backend` y `/frontend` según el stack.|
|3|Diagramas UML|Fuentes `.puml` en `/modelosUML`. SVGs en `/images`.|
|4|Imágenes|En `/images`, referenciadas desde el README.|
|5|Documentación adicional|En `/documents`.|
|6|**`conversation-log.md`**|Ver [`conversation-log.md`](conversation-log.md).|

> Todos los artefactos, correctamente relacionados, son **obligatorios**.

Reglas concretas:
- `QUE_HACE.md` no se toca después del primer commit.
- El código fuente va siempre en `src/`.
- Los `.puml` van en `modelosUML/`.
- Los SVG generados van en `images/`.
- Cualquier documento adicional va en `documents/`.
- `conversation-log.md` se escribe durante la sesión, no se reconstruye después.
