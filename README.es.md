# Template engine kata

[🇬🇧 English version](README.md)

## El Problema
Desarrollar una biblioteca de plantillas que reemplace cierto texto marcado utilizando un diccionario de variables. La función toma dos argumentos, el texto de la plantilla y el diccionario. Se espera que la salida sea el texto reemplazado.

## Ejemplo 1:
### Entrada de texto:

"Esta es una plantilla con una ${variable}"
### Entrada de diccionario:

{ "variable": "valor" }
### Salida:

"Esta es una plantilla con una valor"

## Ejemplo 2:
### Entrada de texto:

"Esta es una plantilla con una ${variable} a ser reemplazada. \n" +
"Y esta es otra plantilla con ${other-variable} a ser reemplazada. \n" +
"Y esta es otra plantilla con ${another-variable} a ser reemplazada."
### Entrada de diccionario:

{
  "variable": "valor",
  "other-variable": "otro-valor",
  "another-variable": "otro-valor"
}
### Salida:

"Esta es una plantilla con una valor a ser reemplazada. \n" +
"Y esta es otra plantilla con otro-valor a ser reemplazada. \n" +
"Y esta es otra plantilla con otro-valor a ser reemplazada."

## Casos límite
Uno de los aspectos más interesantes de este kata son los casos límite. Esta va a ser una biblioteca de código abierto, potencialmente utilizada para una amplia variedad de problemas. No podemos anticipar todos los posibles escenarios, por lo que es importante manejar todos los casos. Por favor, considera los casos de nulos, vacíos, variables no encontradas en el diccionario, variables no utilizadas en el diccionario...

Considera el caso de una cadena vacía como clave en el diccionario, y el caso de valores que no son convertibles a cadena (no serializables)...