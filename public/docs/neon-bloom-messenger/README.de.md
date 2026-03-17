# 🌸 Neon Bloom Messenger (Deutsche Version)

> Premium, hochleistungsfähiges und sicheres Kommunikationsökosystem.

Neon Bloom Messenger ist eine komplette Kommunikationsinfrastruktur, die für Privatsphäre, Geschwindigkeit und brutalistisch-premium Ästhetik konzipiert wurde. Aufbauend auf dem **Matrix** Protokoll und betrieben mit **Elysia (Bun)** und **React**.

---

## 🚀 Live Ökosystem

| Dienst | URL | Beschreibung |
| :--- | :--- | :--- |
| **🌐 Frontend** | [h4ck3d.cloud](https://h4ck3d.cloud) | Hauptbenutzeroberfläche |
| **⚡ API** | [api.h4ck3d.cloud](https://api.h4ck3d.cloud) | Hochleistungs-Backend |
| **💬 Matrix** | [matrix.h4ck3d.cloud](https://matrix.h4ck3d.cloud) | Dezentrales Kommunikationsprotokoll |
| **📁 Files** | [files.h4ck3d.cloud](https://files.h4ck3d.cloud) | Sichere Speicherung (MinIO) |
| **🛡️ Admin** | [admin.h4ck3d.cloud](https://admin.h4ck3d.cloud) | Matrix Server-Management (Synapse) |

---

## ✨ Schlüsselfunktionen

- **🔐 Ende-zu-Ende Verschlüsselung**: Sichere Kommunikation über Matrix-Protokoll.
- **🚀 Ultra-schnelles Backend**: Läuft auf ElysiaJS und Bun für minimale Latenz.
- **🎨 Brutalist Premium UI**: Einzigartiges Design, das Kraft und Eleganz verbindet.
- **📁 Integrierte Speicherung**: Sichere Datei-Uploads über S3-kompatibles MinIO.
- **🔄 Automatische Updates**: Verwaltet über Watchtower-Tool.
- **🛡️ Volle Kontrolle**: Komplette Kontrolle über Ihre Daten und Infrastruktur.

---

## 🛠️ Technologien

### Frontend
- **Framework**: React (Vite)
- **Runtime**: Bun
- **Styling**: Tailwind CSS + shadcn/ui
- **Animationen**: Framer Motion

### Backend & Infra
- **Core**: ElysiaJS (Bun)
- **Datenbank**: PostgreSQL + Redis
- **Protokoll**: Matrix Synapse
- **Proxy**: Caddy (Automatisches SSL)
- **Dateien**: MinIO

---

## 🚢 Deployment (VPS)

```bash
# 1. Code bündeln
tar --exclude='node_modules' --exclude='.git' -cvf bundle.tar .

# 2. Auf Server senden
scp bundle.tar root@194.182.87.6:/root/

# 3. Auf Server
mkdir -p neon-bloom-messenger
tar -xvf bundle.tar -C neon-bloom-messenger/
cd neon-bloom-messenger
chmod +x scripts/*.sh
./scripts/deploy.sh
```

---

Entwickelt mit ❤️ vom Neon Bloom Team.