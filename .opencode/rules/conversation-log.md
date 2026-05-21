# Regla: conversation-log.md

Al final de cada intercambio relevante con el usuario, debes **escribir un resumen** en `conversation-log.md` con este formato **estricto**: el orden debe ser exactamente Prompt → Resultado → Decisión, sin alterarlo ni añadir secciones intermedias.

```
## [HH:MM] Título breve de lo que se pidió

**Prompt:** lo que el usuario pidió (resumido fielmente)

**Resultado:** lo que se produjo (cambios, archivos, decisiones técnicas)

**Decisión:** qué se aceptó, qué se rechazó, qué se modificó, y por qué
```

Normas:
- El log **no se reescribe**. Se escribe mientras ocurre.
- No hace falta cada mensaje individual. Solo los intercambios relevantes.
- La hora debe ser la real del intercambio.
- Si el usuario rechaza algo, debe quedar registrado.
- El log debe poder leerlo alguien que no estuvo en la sesión.
- Las entradas se añaden al final, en orden cronológico ascendente (la más antigua primero).
