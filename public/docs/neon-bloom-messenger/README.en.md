# 🌸 Neon Bloom Messenger (English Version)

> Premium, high-performance, and secure communication ecosystem.

Neon Bloom Messenger is a complete communication infrastructure designed for privacy, speed, and brutalist-premium aesthetics. Built on the **Matrix** protocol and powered by **Elysia (Bun)** and **React**.

---

## 🚀 Live Ecosystem

| Service | URL | Description |
| :--- | :--- | :--- |
| **🌐 Frontend** | [h4ck3d.cloud](https://h4ck3d.cloud) | Main user interface |
| **⚡ API** | [api.h4ck3d.cloud](https://api.h4ck3d.cloud) | High-performance Backend |
| **💬 Matrix** | [matrix.h4ck3d.cloud](https://matrix.h4ck3d.cloud) | Decentralized communication protocol |
| **📁 Files** | [files.h4ck3d.cloud](https://files.h4ck3d.cloud) | Secure storage (MinIO) |
| **🛡️ Admin** | [admin.h4ck3d.cloud](https://admin.h4ck3d.cloud) | Matrix server management (Synapse) |

---

## ✨ Key Features

- **🔐 End-to-End Encryption**: Secure communication via Matrix protocol.
- **🚀 Ultra-Fast Backend**: Runs on ElysiaJS and Bun for minimal latency.
- **🎨 Brutalist Premium UI**: Unique design combining power and elegance.
- **📁 Integrated Storage**: Secure file uploads via S3-compatible MinIO.
- **🔄 Automatic Updates**: Managed via Watchtower tool.
- **🛡️ Full Control**: Complete control over your data and infrastructure.

---

## 🛠️ Technologies

### Frontend
- **Framework**: React (Vite)
- **Runtime**: Bun
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion

### Backend & Infra
- **Core**: ElysiaJS (Bun)
- **Database**: PostgreSQL + Redis
- **Protocol**: Matrix Synapse
- **Proxy**: Caddy (Automatic SSL)
- **Files**: MinIO

---

## 🚢 Deployment (VPS)

```bash
# 1. Bundle code
tar --exclude='node_modules' --exclude='.git' -cvf bundle.tar .

# 2. Send to server
scp bundle.tar root@194.182.87.6:/root/

# 3. On server
mkdir -p neon-bloom-messenger
tar -xvf bundle.tar -C neon-bloom-messenger/
cd neon-bloom-messenger
chmod +x scripts/*.sh
./scripts/deploy.sh
```

---

Developed with ❤️ by the Neon Bloom team.