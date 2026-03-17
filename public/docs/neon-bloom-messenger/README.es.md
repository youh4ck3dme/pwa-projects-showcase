# 🌸 Neon Bloom Messenger (Versión Española)

> Ecosistema de comunicación premium, de alto rendimiento y seguro.

Neon Bloom Messenger es una infraestructura de comunicación completa diseñada para la privacidad, velocidad y estética brutalista-premium. Construido sobre el protocolo **Matrix** y potenciado por **Elysia (Bun)** y **React**.

---

## 🚀 Ecosistema en Vivo

| Servicio | URL | Descripción |
| :--- | :--- | :--- |
| **🌐 Frontend** | [h4ck3d.cloud](https://h4ck3d.cloud) | Interfaz de usuario principal |
| **⚡ API** | [api.h4ck3d.cloud](https://api.h4ck3d.cloud) | Backend de alto rendimiento |
| **💬 Matrix** | [matrix.h4ck3d.cloud](https://matrix.h4ck3d.cloud) | Protocolo de comunicación descentralizado |
| **📁 Files** | [files.h4ck3d.cloud](https://files.h4ck3d.cloud) | Almacenamiento seguro (MinIO) |
| **🛡️ Admin** | [admin.h4ck3d.cloud](https://admin.h4ck3d.cloud) | Gestión del servidor Matrix (Synapse) |

---

## ✨ Características Clave

- **🔐 Cifrado de extremo a extremo**: Comunicación segura mediante protocolo Matrix.
- **🚀 Backend ultra rápido**: Funciona con ElysiaJS y Bun para latencia mínima.
- **🎨 UI Brutalist Premium**: Diseño único que combina fuerza y elegancia.
- **📁 Almacenamiento integrado**: Subida segura de archivos mediante MinIO compatible con S3.
- **🔄 Actualizaciones automáticas**: Gestionado mediante la herramienta Watchtower.
- **🛡️ Control total**: Control completo sobre sus datos e infraestructura.

---

## 🛠️ Tecnologías

### Frontend
- **Framework**: React (Vite)
- **Runtime**: Bun
- **Styling**: Tailwind CSS + shadcn/ui
- **Animaciones**: Framer Motion

### Backend & Infra
- **Core**: ElysiaJS (Bun)
- **Base de datos**: PostgreSQL + Redis
- **Protocolo**: Matrix Synapse
- **Proxy**: Caddy (SSL automático)
- **Archivos**: MinIO

---

## 🚢 Despliegue (VPS)

```bash
# 1. Empaquetar código
tar --exclude='node_modules' --exclude='.git' -cvf bundle.tar .

# 2. Enviar al servidor
scp bundle.tar root@194.182.87.6:/root/

# 3. En el servidor
mkdir -p neon-bloom-messenger
tar -xvf bundle.tar -C neon-bloom-messenger/
cd neon-bloom-messenger
chmod +x scripts/*.sh
./scripts/deploy.sh
```

---

Desarrollado con ❤️ por el equipo Neon Bloom.