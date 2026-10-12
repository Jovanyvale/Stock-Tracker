# INSTALL.md — Stock Tracker

Documentación de instalación, dependencias y configuración del proyecto.

---

## Requisitos

| Herramienta | Versión mínima | Verificar con |
|---|---|---|
| Node.js | 20.x o superior | `node --version` |
| npm | 10.x o superior | `npm --version` |
| MySQL | 8.0 o superior | `mysql --version` |
| Git | 2.x | `git --version` |

---

## Estructura del proyecto
Stock Tracker/
├── backend/ → API REST (Express + TypeScript + Prisma)
├── frontend/ → App React (Vite + TypeScript + Tailwind)
└── README.md


---

## Stack

### Backend
| Tecnología | Versión | Rol |
|---|---|---|
| Node.js | 20.x | Runtime |
| TypeScript | 5.x | Lenguaje |
| Express | 4.x | Framework HTTP |
| Prisma | 6.x | ORM |
| MySQL | 8.0 | Base de datos |
| tsx | 4.x | Ejecuta TS en dev |
| cors | 2.x | Middleware CORS |
| dotenv | 16.x | Variables de entorno |

### Frontend
| Tecnología | Versión | Rol |
|---|---|---|
| React | 19.x | Framework UI |
| TypeScript | 5.x | Lenguaje |
| Vite | 7.x | Bundler + dev server |
| Tailwind CSS | 4.x | Estilos |
| ESLint | 9.x | Linter |

---

## Instalación paso a paso

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd "Stock Tracker"